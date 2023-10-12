import TicketService from "../services/ticketSrvice.js";

class TicketController {
  constructor() {
    this.ticketService = new TicketService();
  }

  async createTicket(req, res) {
    try {
      console.log("Datos recibidos en req.body:", req.body);

      const data = req.body;
      const ticket = await this.ticketService.createTicket(data);

      if (ticket) {
        console.log("Ticket creado", ticket); // Esto debe mostrarte el ticket que se creó.
        res.status(201).json(ticket);
      } else {
        throw new Error("Error al crear el ticket");
      }
    } catch (error) {
      console.error('Error específico en la creación del ticket:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new TicketController();
