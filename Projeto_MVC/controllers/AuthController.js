const User = require("../model/User");
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static async login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash("message", "Usuário não encontrado");
      res.render("auth/login");
      return;
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      req.flash("message", "Senha incorreta");
      res.render("auth/login");
      return;
    }

    req.session.userid = user.id;
    req.flash("message", "Auteticação realizada com sucesso");
    req.session.save(() => {
      res.redirect("/");
    });
  }

  static async register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    if (password != confirmpassword) {
      req.flash("message", "Senhas diferentes");
      res.render("auth/register");
      return; 
    }

    const checkUser = await User.findOne({ where: { email: email } });
    if (checkUser) {
      req.flash("message", "Email ja está em uso");
      res.render("auth/register");
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashPassword,
    };

    try {
      const createUser = await User.create(user);
      req.flash("message", "Cadastro realizado com sucesso");
      req.session.userid = createUser.id;
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
};
