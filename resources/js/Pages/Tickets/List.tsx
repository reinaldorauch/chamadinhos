import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Ticket } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { dateTimeFormatter } from "@/utils";
import { Button } from "@headlessui/react";

export default function List({ tickets }: PageProps<{ tickets: Ticket[] }>) {

  const [rowData] = useState(tickets);

  const onDeleteTicket = (id: number) => {
    if (confirm('Are you sure you want to delete this record?')) {
      router.delete(route('tickets.delete', { id }));
    }
  }

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tickets</h2>
          <Link className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150" as="button" href={route('tickets.create')}>Create</Link>
        </div>

      }
    >
      <Head title="Tickets" />

      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="ag-theme-quartz-dark" style={{ height: "70vh" }}>
              <AgGridReact<Ticket> rowData={rowData} columnDefs={[
                { field: 'title' },
                { field: 'category.description', headerName: 'Category' },
                { field: 'description' },
                { field: 'status.description', headerName: 'Status' },
                { field: 'created_at', headerName: 'Created At', valueFormatter: d => dateTimeFormatter(d.value) },
                { field: 'solution_date', headerName: 'Due Date', valueFormatter: d => dateTimeFormatter(d.value) },
                { field: 'solved_at', headerName: 'Solved At', valueFormatter: d => dateTimeFormatter(d.value) || 'Not Solved' },
                {
                  headerName: "Options",
                  cellRenderer: (props: CustomCellRendererProps) => (
                    <>
                      <Link className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white" href={route('tickets.handle', { id: props.data.id })}>Handle</Link>
                      <Button className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white" onClick={() => onDeleteTicket(props.data.id)}>Delete</Button>
                    </>
                  )
                }
              ]} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
