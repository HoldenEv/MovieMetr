describe("API Tests", () => {
  const userId = "663940b143367ced60b62366";
  const listName = "sample list";

  it("should add a new list", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:3001/listRoutes/addList?name=${listName}&userId=${userId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("name", listName);
      expect(response.body).to.have.property("user_id", userId);
    });
  });

  it("should retrieve user lists", () => {
    cy.request(
      `GET`,
      `http://localhost:3001/listRoutes/getLists?userId=${userId}`,
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      // Add assertion for the created list if needed
      // For example, to check if the created list is included in the response
      const createdList = response.body.find(
        (list: { name: string }) => list.name === listName,
      );
      expect(createdList).to.exist;
    });
  });
});
