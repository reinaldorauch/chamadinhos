import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Ticket, PageProps, TicketCategory } from "@/types";
import { Field, Select } from "@headlessui/react";
import { Head, router, useForm } from "@inertiajs/react";
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from "react";
import CategoryForm from "./CategoryForm";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function TicketForm({ ticket, categories }: PageProps<{ ticket: Ticket, categories: TicketCategory[] }>) {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm<{ title?: string; description?: string, category_id?: number }>({
    title: ticket?.title,
    description: ticket?.description,
    category_id: ticket?.category?.id
  });

  const setCategoryId: ChangeEventHandler<HTMLSelectElement> = e => {
    if (!isNaN(+e.target.value)) {
      setData('category_id', +e.target.value);
    } else {
      setData('category_id', undefined);
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
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create new ticket</h2>}
    >
      <Head title="Tickets" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-5 ">
            <form onSubmit={submit} className="space-y-5">
              <Field>
                <InputLabel htmlFor="title" value="Title *" />
                <TextInput
                  id="title"
                  name="title"
                  className="mt-1 block w-full"
                  autoComplete="title"
                  isFocused={true}
                  value={data.title}
                  onChange={e => setData('title', e.target.value)}
                  required
                />
                <InputError message={errors.title} className="mt-2" />
              </Field>
              <Field>
                <InputLabel htmlFor="categoryId" value="Category *" />
                <Select id="category_id" value={data?.category_id} required onChange={setCategoryId}>
                  <option value="">{!categories.length ? 'Please add one category' : 'Please select'}</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.description}</option>)}
                </Select>
                <PrimaryButton onClick={showAddModal}>+ Adicionar</PrimaryButton>
                <InputError message={errors.category_id} className="mt-2" />
              </Field>
              <Field>
                <InputLabel htmlFor="description" value="Description *" />
                <TextAreaInput
                  id="description"
                  name="description"
                  className="mt-1 block w-full"
                  autoComplete="description"
                  isFocused={true}
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
      <Modal show={showAddCategoryModal} onClose={() => setShowAddCategoryModal(false)} >
        <div className="p-5">
          <CategoryForm onSave={onCategorySave} />
        </div>
      </Modal>
    </AuthenticatedLayout>
  );
}