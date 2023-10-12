class DTOFactory {
    createUserDTO(user) {
        return new UserDTO(user);
    }

    createProductDTO(product) {
        return new ProductDTO(product);
    }

    createCartDTO(cart) {
        return new CartDTO(cart);
    }

    createMessageDTO(message) {
        return new MessageDTO(message);
    }
}