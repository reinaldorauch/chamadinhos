import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Ticket, PageProps, TicketCategory, TicketStatus } from "@/types";
import { Field, Select } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from "react";
import CategoryForm from "./CategoryForm";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function TicketForm({ ticket, status }: PageProps<{ ticket: Ticket, status: TicketStatus[] }>) {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm<{ title?: string; description?: string, status_id?: number }>({
    title: ticket?.title,
    description: ticket?.description,
    status_id: ticket?.category?.id
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

    post(route('tickets.store'));
  };

  const showAddModal: MouseEventHandler = e => {
    e.preventDefault();
    setShowAddCategoryModal(true);
  };

  const onCategorySave = () => {
    setShowAddCategoryModal(false);
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
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    disabled
                    required
                  />
                  <InputError message={errors.title} className="mt-2" />
                </div>
                <div className="w-1/2">
                  <InputLabel htmlFor="categoryId" value="Category *" />
                  <Select id="status_id" value={data?.status_id} required onChange={setStatusId}>
                    <option value="">{!status.length ? 'Please add one category' : 'Please select'}</option>
                    {status.map(c => <option key={c.id} value={c.id}>{c.description}</option>)}
                  </Select>
                  <InputError message={errors.status_id} className="mt-2" />
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
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                  required
                />
                <InputError message={errors.description} className="mt-2" />
              </Field>
              <Field>
                <PrimaryButton disabled={processing}>
                  Create ticket
                </PrimaryButton>
              </Field>
            </form>
          </div>
        </div>
      </div>
      <Modal show={showAddCategoryModal} onClose={() => setShowAddCategoryModal(false)}>
        <CategoryForm onSave={onCategorySave} />
      </Modal>
    </AuthenticatedLayout>
  );
}