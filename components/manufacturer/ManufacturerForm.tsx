'use client';

import { Manufacturer } from '@/entities/manufacturer';
import {
  getManufacturerById,
  postManufacturer,
  updateManufacturer,
} from '@/services/manufacturer/manufacturer-service';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { InputWithUseForm } from '../inputs/InputWithUseForm';
import DiscardModal from '../discard/DisCardModal';

const ManufacturerForm: React.FC = () => {
  const [manufacturer, setManufacturer] = useState<Manufacturer | null>(null);
  const router = useRouter();
  const pathName = usePathname();
  const id = pathName.split('/').pop();
  const isNew = !id || id === 'new-manufacturer';

  const methods = useForm<Manufacturer>({
    defaultValues: manufacturer || { name: '' },
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (id && id !== 'new-manufacturer') {
      const fetchManufacturer = async () => {
        const data = await getManufacturerById(Number(id));
        setManufacturer(data);
        reset(data);
      };

      fetchManufacturer();
    }
  }, [id, reset]);

  const onSubmit = async (data: Manufacturer) => {
    let result;
    if (!isNew) {
      result = await updateManufacturer(Number(id), data);
    }
    if (isNew) {
      result = await postManufacturer(data);
    }
    if (result) {
      reset(data);
      router.push(`/manufacturer/${result.id}`);
    }
  };

  const handleDiscard = () => {
    if (manufacturer) {
      reset(manufacturer);
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
            <InputWithUseForm name="name" label="Manufacturer Name" required />
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

export default ManufacturerForm;
