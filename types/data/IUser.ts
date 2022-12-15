import { IKaryawan } from './Ikaryawan';

export interface IUser {
  username: string;
  password?: string;
  kode_lokasi: string;
  karyawan?: IKaryawan;
}
