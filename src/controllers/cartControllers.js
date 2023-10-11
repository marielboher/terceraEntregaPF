import CartService from "../services/cartServices.js";
import ticketController from "./ticketController.js";

class CartController {
  constructor() {
    this.cartService = new CartService();
  }

  async createCart(req, res) {
    try {
      const newCart = await this.cartService.createCart();
      res.send(newCart);
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  }

  async getCart(req, res) {
    try {
      const cart = await this.cartService.getCart(req.params.cid);
      res.send({ products: cart.products });
    } catch (error) {
      console.log("hola en cart controller");
      res.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const result = await this.cartService.addProductToCart(cid, pid);
      res.send(result);
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  }

  async updateQuantityProductFromCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const result = await this.cartService.updateQuantityProductFromCart(
        cid,
        pid,
        quantity
      );
      res.send(result);
    } catch (error) {
      res.status(400).send({ status: "error", message: error.message });
    }
  }

  async updateCart(req, res) {
    try {
      const cid = req.params.cid;
      const products = req.body.products;
      await this.cartService.updateCart(cid, products);
      res.send({
        status: "ok",
        message: "El producto se agregó correctamente!",
      });
    } catch (error) {
      res.status(400).send({ status: "error", message: error.message });
    }
  }

  async deleteProductFromCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const result = await this.cartService.deleteProductFromCart(cid, pid);
      res.send(result);
    } catch (error) {
      res.status(400).send({ status: "error", message: error.message });
    }
  }

  async deleteProductsFromCart(req, res) {
    try {
      const cid = req.params.cid;
      const result = await this.cartService.deleteProductsFromCart(cid);
      res.send(result);
    } catch (error) {
      res.status(400).send({ status: "error", message: error.message });
    }
  }

  async createPurchaseTicket(req, res) {
    try {
      console.log("req.user:", req.user);
      if (!req.user || !req.user.id) {
        console.error("req.user no está definido");
        return res.status(400).json({ error: "Usuario no definido" });
      }

      const cart = await this.cartService.getCart(req.params.cid);

      if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }

      const totalAmount = cart.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
      console.log("totalAmount:", totalAmount);
      const ticketData = {
        code: 10,
        amount: totalAmount,
        purchaser: req.user.id,
      };

      await ticketController.createTicket({ body: ticketData, ...req }, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear el ticket de compra" });
    }
  }

  async getPurchase(req, res) {
    try {
      const cid = req.params.cid;
      const purchase = await this.cartService.getCart(cid);

      if (purchase) {
        res.json({ status: "success", data: purchase });
      } else {
        res
          .status(404)
          .json({ status: "error", message: "Compra no encontrada" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Error interno del servidor" });
    }
  }
}

export default new CartController();
