'use client';

import { Manufacturer } from '@/entities/manufacturer';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { InputWithUseForm } from '../inputs/InputWithUseForm';
import DiscardModal from '../discard/DisCardModal';
import { Type } from '@/entities/Type';
import { getTypeById, postType, updateType } from '@/services/type/getType';

const TypeForm: React.FC = () => {
  const [type, setType] = useState<Type | null>(null);
  const router = useRouter();
  const pathName = usePathname();
  const id = pathName.split('/').pop();
  const isNew = !id || id === 'new-type';

  const methods = useForm<Manufacturer>({
    defaultValues: type || { name: '' },
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (id && id !== 'new-type') {
      const fetchType = async () => {
        const data = await getTypeById(Number(id));
        setType(data);
        reset(data);
      };

      fetchType();
    }
  }, [id, reset]);

  const onSubmit = async (data: Manufacturer) => {
    let result;
    if (!isNew) {
      result = await updateType(Number(id), data);
    }
    if (isNew) {
      result = await postType(data);
    }
    if (result) {
      reset(data);
      router.push(`/type/${result.id}`);
    }
  };

  const handleDiscard = () => {
    if (type) {
      reset(type);
    } else {
      reset();
    }

    (document.getElementById('discard_modal') as HTMLDialogElement)?.close();
  };

  return (
    <div className="flex justify-center min-h-screen mt-8">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputWithUseForm name="name" label="Type" required />
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

export default TypeForm;
