import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Ticket, PageProps, TicketStatus } from "@/types";
import { Field, Select } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { ChangeEventHandler, FormEventHandler } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import { dateTimeFormatter } from "@/utils";

export default function TicketForm({ ticket, status }: PageProps<{ ticket: Ticket, status: TicketStatus[] }>) {
  const { data, setData, patch, processing, errors, reset } = useForm<{ id: number, status_id?: number }>({
    id: ticket.id,
    status_id: ticket?.status?.id,
  });

  const setStatusId: ChangeEventHandler<HTMLSelectElement> = e => {
    if (!isNaN(+e.target.value)) {
      setData('status_id', +e.target.value);
    } else {
      setData('status_id', undefined);
    }
  }

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('tickets.store-handle'));
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Handling ticket #{ticket.id}</h2>}
    >
      <Head title="Tickets" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-5 ">
            <form onSubmit={submit} className="space-y-5">
              <div className="flex space-x-5">
                <div className="w-1/2">
                  <InputLabel htmlFor="title" value="Title *" />
                  <TextInput
                    id="title"
                    name="title"
                    className="mt-1 block w-full"
                    autoComplete="title"
                    value={ticket.title}
                    disabled
                    required
                  />
                </div>
                <div className="w-1/4">
                  <InputLabel htmlFor="categoryId" value="Category *" />
                  <Select id="status_id" value={data?.status_id} required onChange={setStatusId}>
                    <option value="">{!status.length ? 'Please add one category' : 'Please select'}</option>
                    {status.map(c => <option key={c.id} value={c.id}>{c.description}</option>)}
                  </Select>
                  <InputError message={errors.status_id} className="mt-2" />
                </div>
                <div className="w-1/4">
                  <PrimaryButton disabled={processing}>
                    Update status
                  </PrimaryButton>
                </div>
              </div>
              <Field>
                <InputLabel htmlFor="description" value="Description *" />
                <TextAreaInput
                  id="description"
                  name="description"
                  className="mt-1 block w-full"
                  autoComplete="description"
                  disabled
                  value={ticket.description}
                  required
                />
              </Field>
              <div className="text-gray-300 flex justify-between">
                <div>Created at: {dateTimeFormatter(ticket.created_at)}</div>
                <div>Last updated at: {dateTimeFormatter(ticket.updated_at)}</div>
                <div>Solution Due Date: {dateTimeFormatter(ticket.solution_date)}</div>
                <div>Solved at: {ticket.solved_at ? dateTimeFormatter(ticket.solved_at) : 'Not solved'}</div>
              </div>
              <Field>

              </Field>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}