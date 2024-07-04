import { createExerciseController } from "../src/controllers/createExercise.controller";
import { userService } from "../src/services/user.service";




describe("Create exercise controller tests", () => {
   
    test("it should return a status 201 when createExercise is called", async() => {
        let createSpy = jest.spyOn(userService, 'createExercise').mockReturnValue("TestExercise");
        const res = {};
        res.json = jest.fn(() => "TestExercise");
        res.status = jest.fn(() => res);

        const returned = await createExerciseController( {body:"MockReq"}, res);

        expect(createSpy).toHaveBeenCalledWith("MockReq");
        expect(returned).toEqual("TestExercise");
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith("TestExercise");
    });
});