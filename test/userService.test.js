import User from "../src/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userService } from "../src/services/user.service";


describe("User service tests", () => {
    describe("Register tests", () => {

        test("should call user find one and throw error if the user exists", async () => {

            let userSpy = jest.spyOn(User, 'findOne').mockReturnValue({ _id: "1", password: "TestPass" });

            try {
                await userService.register({ email: "TestEmail", password: "TestPass" });
            } catch (e) {
                expect(userSpy).toHaveBeenCalledWith({ email: "TestEmail" });
                expect(e).toBeInstanceOf(Error);
            }
        });
       
    }); 
    
    describe("Login tests", () => {
        test("should call user find one and return the id email and access token", async () => {
            let userSpy = jest.spyOn(User, 'findOne').mockReturnValue({ _id: "1", password: "TestPass", email:"TestEmail" });
            jest.spyOn(bcrypt, 'compare').mockReturnValue(true);
            jest.spyOn(jwt, 'sign').mockReturnValue("TestToken");

            const res = await userService.login({ email: "TestEmail", password: "TestPass" });

            expect(res).toEqual({
                id: "1",
                accessToken: "TestToken",
                email: "TestEmail"
            });
            expect(userSpy).toHaveBeenCalledWith({ email: "TestEmail" });

        });

        test("should throw an error if the password doesn't match", async () => {
            jest.spyOn(User, 'findOne').mockReturnValue({ _id: "1", password: "TestPass", email:"TestEmail" });
            jest.spyOn(bcrypt, 'compare').mockReturnValue(false);
            jest.spyOn(jwt, 'sign').mockReturnValue("TestToken");

            try {
                const res = await userService.login({ email: "TestEmail", password: "TestPass" });
            } catch (e) {
                expect(e).toBeInstanceOf(Error);
            }

            
        });
    });

    describe("Create exercise tests", () => {
        
        test("it should call findbyId and give an error if the user isn't found", async () => {

            let findByIdSpy = jest.spyOn(User, 'findById').mockReturnValue({});
            
            try {
                await userService.createExercise({ userId: "1", exercise: { name: "TestName" } });
            } catch (e) {
                expect(findByIdSpy).toHaveBeenCalledWith("1");
                expect(e).toBeInstanceOf(Error);
            }
        });

        test("it should give an error when exercise already exists", async () => {
            let findByIdSpy = jest.spyOn(User, 'findById').mockReturnValue({ _id: "1", password: "TestPass", email: "TestEmail", exercises: [{name:"TestName"}] });

            try {
                await userService.createExercise({ userId: "1", exercise: { name: "TestName" } });
            } catch (e) {
                expect(e).toBeInstanceOf(Error);
            }

        });
    });

    describe("Get exercise tests", () => {
        
        test("it should call findById and return and error if the user isn't found", async () => {
           let findByIdSpy = jest.spyOn(User, 'findById').mockReturnValue({});
            
            try {
                await userService.getExercises("1");
            } catch (e) {
                expect(findByIdSpy).toHaveBeenCalledWith("1");
                expect(e).toBeInstanceOf(Error);
            }
        });

        test("it should return the users exercises", async () => {
            let findByIdSpy = jest.spyOn(User, 'findById').mockReturnValue({ id: 1, exercises: [{ name: "TestExercise" }] });
            
            const res = await userService.getExercises("1");

            expect(res).toEqual([{ name: "TestExercise" }]);
        });
    });

    describe("Delete Exercise tests", () => {

        test("it should call findById and return and error if not found", async () => {
            let findByIdSpy = jest.spyOn(User, 'findById').mockReturnValue({});
            
            try {
                await userService.deleteExercise({ userId: "TestId", exercise: {} });
            } catch (e) {
                expect(findByIdSpy).toHaveBeenCalledWith("TestId");
                expect(e).toBeInstanceOf(Error);
            }

        });

    });

    describe("Create workout tests", () => {
       
         test("it should call findById and return and error if not found", async () => {
            let findByIdSpy = jest.spyOn(User, 'findById').mockReturnValue({});
            
            try {
                await userService.createWorkout({ userId: "TestId", workout: {} });
            } catch (e) {
                expect(findByIdSpy).toHaveBeenCalledWith("TestId");
                expect(e).toBeInstanceOf(Error);
            }

         });
        
        test("it should throw and error if the workout already exists", async () => {
           let findByIdSpy = jest.spyOn(User, 'findById').mockReturnValue({workouts:[{name: "TestWorkout"}]});
            
            try {
                await userService.createWorkout({ userId: "TestId", workout: {name: "TestWorkout"} });
            } catch (e) {
                expect(e).toBeInstanceOf(Error);
            }
            
        });
    });

    describe("Get workouts tests", () => {
       
        test("it should call findById and return and error if not found", async () => {
        let findByIdSpy = jest.spyOn(User, 'findById').mockReturnValue({});
        
        try {
            await userService.getWorkouts({ userId: "TestId"});
        } catch (e) {
            expect(findByIdSpy).toHaveBeenCalledWith("TestId");
            expect(e).toBeInstanceOf(Error);
        }

        });

        test("it should return the users workouts", async () => {
            let findByIdSpy = jest.spyOn(User, 'findById').mockReturnValue({userId: "TestId", workouts: [{ name: "TestWorkout" }] });
            
            const res = await userService.getWorkouts({ userId: "TestId" })
            
            expect(res).toEqual([{name: "TestWorkout"}]);
        });
    });

    describe("delete workout tests", () => {
        test("it should call findById and return and error if not found", async () => {
        let findByIdSpy = jest.spyOn(User, 'findById').mockReturnValue({});
        
        try {
            await userService.deleteWorkout({ userId: "TestId", workout:{}});
        } catch (e) {
            expect(findByIdSpy).toHaveBeenCalledWith("TestId");
            expect(e).toBeInstanceOf(Error);
        }

        });
    });

    describe("edit workout tests", () => {
        test("it should call findById and return and error if not found", async () => {
        let findByIdSpy = jest.spyOn(User, 'findById').mockReturnValue({});
        
        try {
            await userService.editWorkout({ userId: "TestId", workout:{}});
        } catch (e) {
            expect(findByIdSpy).toHaveBeenCalledWith("TestId");
            expect(e).toBeInstanceOf(Error);
        }

        });
    });

});