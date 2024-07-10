'use client';
import React, { use, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ClientPackageForm from '@/components/forms/package/ClientPackageForm';
import SubmitAndCancelDiv from '@/components/buttons/SubmitAndCancelDiv';
import { Client } from '@/entities/Client';
import { getAllClients } from '@/services/client/getClient';
import { updatePackage } from '@/services/package/updatePackage';
import { set } from 'zod';
import { clear } from 'console';

interface AddClientInfoFormProps {
  packageId: number;
}

interface newClientInputData {
  clientId: string;
  fittingDate: string;
  warrantyDate: string;
  comment?: string;
}

export default function AddClientInfoForm({
  packageId,
}: AddClientInfoFormProps) {
  const methods = useForm<newClientInputData>();
  const { reset, handleSubmit } = methods;

  const [allClients, setAllClients] = useState<Client[]>([]);

  const clearData = {
    clientId: '',
    fittingDate: '',
    warrantyDate: '',
    comment: '',
  };

  useEffect(() => {
    getAllClients().then((data) => {
      setAllClients(data);
    });
  }, []);

  const onSubmit = async (data: newClientInputData) => {
    console.log('test here');
    try {
      console.log('test here');
      console.log('here', data);
      const clientInfo = {
        clientId: parseInt(data.clientId),
        fittingDate: new Date(data.fittingDate).toISOString(),
        warrantyExpiration: new Date(data.warrantyDate).toISOString(),
        comments: data.comment ?? null,
      };

      await updatePackage(packageId, clientInfo);
      alert(`This Package's client info has been updated`);
      reset(clearData);
    } catch (error) {
      console.error('Failed to update Package data: ', error);
    }
  };

  return (
    <div>
      <div className="mt-20 flex justify-center">
        <FormProvider {...methods}>
          <form className="w-fit" onSubmit={handleSubmit(onSubmit)}>
            <p>Package Id: {packageId}</p>
            <ClientPackageForm
              clientsData={allClients.map((client) => client.id)}
            />
            <SubmitAndCancelDiv cancelPath="./" />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
