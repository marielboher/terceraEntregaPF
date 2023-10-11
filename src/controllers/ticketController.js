import TicketService from "../services/ticketSrvice.js";

class TicketController {
  constructor() {
    this.ticketService = new TicketService();
  }

  async createTicket(req, res) {
    try {
      const data = req.body;
      const ticket = await this.ticketService.createTicket(data);
      res.status(201).json(ticket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new TicketController();
