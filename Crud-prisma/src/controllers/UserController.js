import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async createUser(req, res) {
    try {
      const { name, email } = req.body;

      let validUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (validUser) {
        return res.send("Usuário já existe!!");
      }

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      return res.send(newUser);
    } catch (error) {
      console.log(error);
    }
  },

  async findAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.send(users);
    } catch (error) {
      console.log(error);
    }
  },

  async findUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        return res.send("Usuário não encontrado");
      }
      return res.send(user);
    } catch (error) {
      console.log(error);
    }
  },

  async editUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
      let user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        return res.send("Usuário não encontrado");
      }

      user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email },
      });

      return res.send(user);
    } catch (error) {
      return res.json(error);
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const validUser = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!validUser) {
        return res.send("Usuário não encontrado");
      }

      const user = await prisma.user.delete({ where: { id: Number(id) } });
      return res.send('Usuário removido com sucesso!!');
    } catch (error) {
      console.log(error);
    }
  },
};
