import mongoose from "mongoose";
import Person from "../../models/person";
import { addPerson } from "../../controllers/personController";
import { personById } from "../../middleware/apiPuller";

// jest.mock("../../middleware/apiPuller", () => {
//     personById: jest.fn()
// });

// describe("addPerson", () => {
//     //test adding a person to the database, mocking the database call
//     test("add a person to the database", async () => {
//     const personData = {
//         _id: "1",
//         name: "John Doe",
//         birthday: "01/01/2000",
//         biography: "A person",
//         department: "acting",
//         gender: "male",
//         place_of_birth: "USA",
//         profile_path: "profile.jpg",
//         };
//         const personId = "1";
//         //mock the personById function, not a an instance method so no need to spy on the prototype
//         (personById as jest.Mock).mockResolvedValue(personData);
//         //mock the findOne function in addPerson
//         jest.spyOn(Person, "findOne").mockImplementation(() => ({
//             exec: jest.fn().mockResolvedValue(null)
//           }) as any);

//         jest.spyOn(Person.prototype, "save").mockResolvedValue(personData as any);
//         //call the function
//         const result = await addPerson(personId);
//         //check the result
//         expect(result).toEqual(personData);
//         });
//     });


// Correctly mock the `personById` function
jest.mock("../../middleware/apiPuller", () => ({
    personById: jest.fn()
  }));
  
  describe("addPerson", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("should add a person to the database", async () => {
      const personData = {
        _id: "1",
        name: "John Doe",
        birthday: "01/01/2000",
        biography: "A person",
        department: "acting",
        gender: 1,
        place_of_birth: "USA",
        profile_path: "profile.jpg"
      };
  
      const personId = "1";
  
      // Mock the personById function
      (personById as jest.Mock).mockResolvedValue(personData);
  
      // Mock the findOne method to return null, simulating the person not existing in the database
      jest.spyOn(Person, "findOne").mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(null)
      }) as any);
  
      // Mock the save method on the Person prototype
      jest.spyOn(Person.prototype, "save").mockResolvedValue(personData as any);
  
      // Call the addPerson function
      const result = await addPerson(personId);
  
      // Assertions
      expect(result).toEqual(personData);
      expect(personById).toHaveBeenCalledWith(personId);
      expect(Person.findOne).toHaveBeenCalledWith({ _id: personId });
      expect(Person.prototype.save).toHaveBeenCalled();
    });
  });