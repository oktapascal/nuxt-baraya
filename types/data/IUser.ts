/** @format */

import { IKaryawan } from './Ikaryawan';

export interface IUser {
  id?: number;
  username?: string;
  password?: string;
  kode_lokasi?: string;
  karyawan?: IKaryawan;
}
