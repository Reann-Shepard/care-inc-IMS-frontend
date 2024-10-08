'use client';
import { Color } from '@/entities/Color';
import {
  getColorById,
  postColor,
  updateColor,
} from '@/services/color/getColor';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { InputWithUseForm } from '../inputs/InputWithUseForm';
import DiscardModal from '../discard/DisCardModal';

const ColorForm: React.FC = () => {
  const [color, setColor] = useState<Color | null>(null);
  const router = useRouter();
  const pathName = usePathname();
  const id = pathName.split('/').pop();
  const isNew = !id || id === 'new-color';

  const methods = useForm<Color>({
    defaultValues: color || { name: '' },
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (id && id !== 'new-color') {
      const fetchColor = async () => {
        const data = await getColorById(Number(id));
        setColor(data);
        reset(data);
      };

      fetchColor();
    }
  }, [id, reset]);

  const onSubmit: SubmitHandler<Color> = async (data: Color) => {
    let result;
    if (!isNew) {
      result = await updateColor(Number(id), data);
    }
    if (isNew) {
      result = await postColor(data);
    }

    if (result) {
      reset(data);
      router.push(`/color/${result.id}`);
    }
  };

  const handleDiscard = () => {
    if (color) {
      reset(color);
    } else {
      reset();
    }
    (document.getElementById('discard_modal') as HTMLDialogElement)?.close(); // Close the modal
  };
  return (
    <div className="flex justify-center min-h-screen mt-8">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputWithUseForm name="name" label="Color Name" required />
          </div>
          {isDirty ? (
            <div className="text-right mt-4">
              <button
                className="btn btn-sm btn-success rounded-3xl mr-2"
                type="submit"
              >
                {isNew ? 'Create' : 'Save'}
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline btn-success rounded-3xl"
                onClick={() =>
                  (
                    document.getElementById(
                      'discard_modal',
                    ) as HTMLDialogElement
                  )?.showModal()
                }
              >
                Discard
              </button>
            </div>
          ) : null}
        </form>
      </FormProvider>

      {/* Discard Modal */}
      <DiscardModal handleDiscard={handleDiscard} />
    </div>
  );
};

export { ColorForm };
