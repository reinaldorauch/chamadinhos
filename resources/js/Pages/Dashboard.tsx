import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { AgCharts } from 'ag-charts-react';

const dateFormatter = (d?: string | Date) => {
    if (!d) return '';
    if (typeof d === 'string') d = new Date(d);
    const fmt = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
    return fmt.format(d);
}

export default function Dashboard({ sla, perDay }: PageProps<{ sla: { solved: number, unsolved: number }, perDay: { day: string, count_per_day: number }[] }>) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className='flex max-w-7xl mx-auto'>
                    <div className="grow bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <AgCharts
                                options={{
                                    title: { text: 'SLA of the current month' },
                                    data: Object.entries(sla).map(([key, value]) => ({ key, value })),
                                    series: [{ type: 'pie', angleKey: 'value', legendItemKey: 'key', }]
                                }}
                            />
                        </div>
                    </div>

                    <div className="grow bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <AgCharts
                                options={{
                                    title: { text: 'Tickets created per day in current month' },
                                    data: perDay.map(({ count_per_day, day }) => ({ count_per_day, day: dateFormatter(day) })),
                                    series: [{ type: 'line', xKey: 'day', yKey: 'count_per_day', }]
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
