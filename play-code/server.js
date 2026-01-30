import { createServer, Model, Response } from "miragejs";

createServer({
  models: {
    equipment: Model,
  },

  seeds(server) {
    server.create("equipment", {
      id: "1",
      name: "20 kg olympic barbell",
      price: 900,
      description: "Best bar in the industry for compound movements!",
      imageUrl:
        "https://images.tokopedia.net/img/cache/500-square/product-1/2020/7/8/2990896/2990896_33192b46-61c6-4eaf-99fa-ac753ce81c5e_1080_1080.jpg",
      type: "barbells",
      hostId: "123",
    });

    server.create("equipment", {
      id: "2",
      name: "10 kg dumbells",
      price: 200,
      description: "Achieve your body goals with this dumbells!",
      imageUrl:
        "https://contents.mediadecathlon.com/p2720265/k$80a4f297e7a4c3f0da3bdb7c4954bd4a/picture.jpg",
      type: "dumbells",
      hostId: "123",
    });

    server.create("equipment", {
      id: "3",
      name: "20kg plate",
      price: 100,
      description: "Load your barbells with this plates!",
      imageUrl:
        "https://newlevelsport.pl/wp-content/uploads/2024/10/talerz-obciazeniowy-eleiko-weightlifting-competition-plate-20kg-300x300.png",
      type: "plates",
      hostId: "123",
    });
  },

  routes() {
    this.namespace = "api";
    this.logging = false;
    this.timing = 2000;

    this.get("/equipments", (schema, request) => {
      // Optional: simulate errors with ?error=true query param
      if (request.queryParams.error) {
        return new Response(400, {}, { error: "Error fetching data" });
      }
      return schema.equipment.all();
    });

    this.get("/equipments/:id", (schema, request) => {
      const id = request.params.id;
      return schema.equipment.find(id);
    });

    this.get("/host/equipments", (schema, request) => {
      // Hard-code the hostId for now
      return schema.equipment.where({ hostId: "123" });
    });

    this.get("/host/equipments/:id", (schema, request) => {
      const id = request.params.id;
      return schema.equipment.findBy({ id, hostId: "123" });
    });
  },
});
