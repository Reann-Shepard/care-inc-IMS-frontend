import { Package } from '@/entities/Package';
import axios from 'axios';
import apiClient from '../auth/axios-interceptor';

// Patch
const updatePackage = async (id: number, data: Partial<Package>) => {
  try {
    const response = await apiClient.patch(`/package/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed updating package data: ', error);
    return [];
  }
};

const removePackageClientInfo = async (id: number) => {
  try {
    const response = await apiClient.patch(`/package/${id}/remove-client-info`);
    return response.data;
  } catch (error) {
    console.error('Failed removing package client info: ', error);
    return [];
  }
};

export { updatePackage, removePackageClientInfo };
