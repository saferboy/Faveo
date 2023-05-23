import { UserDto, UserDetail } from "@model/user.dto";
import { PrismaClient, role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

export const createUser = async (user: UserDto) => {
  const hasshPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
  return prisma.user.create({
    data: {
      email: user.email,
      password: hasshPassword,
      name: user.name,
      surname: user.surname,
      username: user.surname,
      birthday: user.birthday,
      phone: user.phone,
    }
  })
}

export const excistUser = async (email: string): Promise<boolean> => {
  const result = await prisma.user.findMany({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  console.log(result);

  return result.length !== 0;
};


export const verifiedUser = async (userId: number, role: role) => {
  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      role
    },
  })
};


export const findUserByEmail = async (email: string) => {
  return prisma.user.findFirst({
    where: {
      email
    }
  })
}


export const findUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: {
      id
    }
  })
}


export const allUser = async () => {
  return prisma.user.findMany()
}


export const updateUserDetails = async (user: UserDetail, id: number) => {
  return prisma.user.update({
    data: {
      email: user.email,
      name: user.name,
      surname: user.surname,
      birthday: user.birthday,
      phone: user.phone
    },
    where: {
      id
    }
  })
}


export const removeUser = async (id: number) => {
  return prisma.user.delete({
    where: {
      id
    }
  })
}