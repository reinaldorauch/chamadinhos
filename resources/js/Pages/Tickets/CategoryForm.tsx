import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function CategoryForm({ onSave }: { onSave: Function }) {
  const { data, processing, errors, setData, post, reset } = useForm({ description: '' });
  const submit: FormEventHandler = e => {
    e.preventDefault();

    post(route('tickets.category.save'), {
      onSuccess: () => {
        reset('description');
        onSave();
      }
    });
  }

  return (
    <form onSubmit={submit}>
      <div>
        <InputLabel htmlFor="description" value="Category Description" />
        <TextInput
          id="description"
          name="description"
          className="w-full"
          value={data.description}
          onChange={e => setData('description', e.target.value)}
        />
        <InputError message={errors.description} className="mt-2" />
      </div>
      <div className="flex items-center justify-end mt-4">
        <PrimaryButton className="ms-4" disabled={processing}>
          Add Category
        </PrimaryButton>
      </div>
    </form>
  )
}