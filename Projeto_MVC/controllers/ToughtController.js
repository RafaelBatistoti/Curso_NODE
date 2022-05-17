const Tought = require("../model/Tought");
const User = require("../model/User");
const { Op, or } = require("sequelize");

module.exports = class ToughtController {
  static async showToughts(req, res) {
    let search = "";

    if (req.query.search) {
      search = req.query.search;
    }

    let order = "DESC";
    if (req.query.order === "old") {
      order = "ASC";
    } else {
      order = "DESC";
    }

    const toughtData = await Tought.findAll({
      include: User,
      where: {
        title: { [Op.like]: `%${search}%` },
      },
      order: [["createdAt", order]],
    });

    const toughts = toughtData.map((result) => result.get({ plain: true }));

    let toughtQnty = toughts.length;

    if (toughtQnty === 0) {
      toughtQnty = false;
    }

    res.render("tought/home", { toughts, search, toughtQnty });
  }

  static async dashboard(req, res) {
    const userId = req.session.userid;
    const user = await User.findOne({
      where: { id: userId },
      include: Tought,
      plain: true,
    });

    if (!user) {
      res.redirect("/login");
    }

    const toughts = user.Toughts.map((result) => result.dataValues);
    let emptyTought = false;
    if (toughts.length === 0) {
      emptyTought = true;
    }

    res.render("tought/dashboard", { toughts, emptyTought });
  }

  static createTought(req, res) {
    res.render("tought/create");
  }

  static async removeToughts(req, res) {
    const id = req.body.id;
    const UserId = req.session.userid;

    try {
      await Tought.destroy({ where: { id: id, UserId, UserId } });
      req.flash("message", "Pensamento removido com sucesso");

      req.session.save(() => {
        res.redirect("/tought/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async editTought(req, res) {
    const id = req.params.id;
    const tought = await Tought.findOne({ where: { id: id }, raw: true });

    res.render("tought/edit", { tought });
  }

  static async editToughtSave(req, res) {
    const id = req.body.id;
    const tought = {
      title: req.body.title,
    };

    try {
      await Tought.update(tought, { where: { id: id } });
      req.flash("message", "Pensamento atualizado com sucesso");

      req.session.save(() => {
        res.redirect("/tought/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async createToughtPost(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    };

    try {
      await Tought.create(tought);
      req.flash("message", "Pensamento criado com sucesso");

      req.session.save(() => {
        res.redirect("/tought/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }
};
