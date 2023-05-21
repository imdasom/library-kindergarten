//@ts-ignore
import { supabase } from '../repositories';
import dayjs from 'dayjs';

type UserResponse = {
  id: number;
  barcode: string;
  name: string;
  role: 'ADMIN' | 'USER';
  created_at: Date;
  updated_at: Date;
};

export type User = {
  id: number;
  barcode: string;
  name: string;
  role: 'ADMIN' | 'USER';
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
};

export const DEFAULT_USER: User = {
  id: 0,
  barcode: '',
  name: '',
  role: 'USER',
  createdAt: dayjs(),
  updatedAt: dayjs(),
};

export const SCHEMA_NAME = 'USER';

export const getUsers = async () => {
  const mapResponse = (list: UserResponse[]): User[] => {
    return list.map((item) => {
      return {
        id: Number(item['id']),
        barcode: item['barcode'],
        name: item['name'],
        role: item['role'],
        createdAt: item['created_at'] ? dayjs(item['created_at']) : dayjs(),
        updatedAt: item['updated_at'] ? dayjs(item['updated_at']) : dayjs(),
      };
    });
  };
  const { data } = await supabase
    .from(SCHEMA_NAME)
    .select()
    .order('id', { ascending: false })
    .returns<UserResponse[]>();

  if (!data) {
    return [];
  }

  return mapResponse(data);
};

export const getUserById = async (id: string): Promise<User | null> => {
  const { data: item } = await supabase
    .from(SCHEMA_NAME)
    .select()
    .eq('id', id)
    .returns<UserResponse[]>()
    .single();

  if (!item) {
    throw Error('존재하지 않는 회원입니다');
  }

  return {
    id: item.id,
    barcode: item.barcode,
    name: item.name,
    role: item.role,
    createdAt: item.created_at ? dayjs(item.created_at) : dayjs(),
    updatedAt: item.updated_at ? dayjs(item.updated_at) : dayjs(),
  };
};

export const getUserByBarcode = async (
  barcode: string
): Promise<User | null> => {
  const { data: item } = await supabase
    .from(SCHEMA_NAME)
    .select()
    .eq('barcode', barcode)
    .returns<UserResponse[]>()
    .single();

  if (!item) {
    throw Error('존재하지 않는 회원입니다');
  }

  return {
    id: item.id,
    barcode: item.barcode,
    name: item.name,
    role: item.role,
    createdAt: item.created_at ? dayjs(item.created_at) : dayjs(),
    updatedAt: item.updated_at ? dayjs(item.updated_at) : dayjs(),
  };
};

export async function createUser(user: User) {
  const newUser = {
    name: user.name,
    role: user.role,
    barcode: user.barcode,
    created_at: user.createdAt.toDate(),
    updated_at: user.updatedAt.toDate(),
  };

  try {
    await supabase.from(SCHEMA_NAME).insert(newUser).throwOnError();
  } catch (error) {
    //@ts-ignore
    if (error.code === '23505') {
      throw Error('중복된 바코드입니다');
    }
    throw error;
  }
}

export async function updateUser(user: User) {
  const updateUser = {
    id: user.id,
    barcode: user.barcode,
    name: user.name,
    role: user.role,
    created_at: user.createdAt.toDate(),
    updated_at: dayjs().toDate(),
  };
  const { error } = await supabase
    .from(SCHEMA_NAME)
    .update(updateUser)
    .eq('id', user.id);
}

export async function deleteUser(user: User) {
  const { error } = await supabase.from(SCHEMA_NAME).delete().eq('id', user.id);
}
