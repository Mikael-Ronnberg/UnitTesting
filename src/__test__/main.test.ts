/**
*@jest-environment jsdom
*/
import { Todo } from "../ts/models/Todo";
import * as mainFunctions from "./../ts/main";
import * as fnFunctions from "./../ts/functions"

test("should call clear todos", ()=>{
    let sneakySpy = jest.spyOn(mainFunctions, "clearTodos").mockReturnValue();
    document.body.innerHTML =`
    <button type="button" id="clearTodos">Rensa lista</button>
    `
    mainFunctions.handleClear();

    document.getElementById("clearTodos")?.click();

    expect(sneakySpy).toHaveBeenCalled();

})

test("should call on createNewTodo", ()=>{
    let sneakySpy = jest.spyOn(mainFunctions, "createNewTodo");
    document.body.innerHTML =`
    <form id="newTodoForm">
      <div>
        <input type="text" id="newTodoText" />
        <button>Skapa</button>
        <button type="button" id="clearTodos">Rensa lista</button>
      </div>
      <div id="error" class="error"></div>
    </form>
    `;
    mainFunctions.handleSubmit();

    (document.getElementById("newTodoForm") as HTMLFormElement).submit();

    expect(sneakySpy).toHaveBeenCalled();

})

describe("createNewTodo", ()=> {
    test("should call on createHtml", ()=>{
        //Arrange
        let sneakySpy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue();
        let testText = "bake my cake";
        let todos: Todo[] = [];
        
        //Act
        mainFunctions.createNewTodo(testText, todos);

        //Assert
        expect(sneakySpy).toHaveBeenCalled();
    })
    test("should call on displayError", ()=>{
        //Arrange
        let sneakySpy = jest.spyOn(mainFunctions, "displayError").mockReturnValue();
        let testText = "b";
        let todos: Todo[] = [];
        
        //Act
        mainFunctions.createNewTodo(testText, todos);

        //Assert
        expect(sneakySpy).toHaveBeenCalled();
    })


})

describe("createHTML", ()=>{
    test("should create HTML", ()=>{
        //Arrange
        document.body.innerHTML = `
        <ul id="todos" class="todo"></ul>`;
    
        let aTodo: Todo = new Todo("bake my cake", false);
        let todos: Todo[] = [aTodo];
    
        //Act
        mainFunctions.createHtml(todos);

        //Assert
        expect((document.querySelector("todo__text") as HTMLLIElement).innerHTML).toBe("bake my cake");
    })
    test("should add class --done", ()=>{

        document.body.innerHTML = `
        <ul id="todos" class="todo">
        </ul>`;
        
        let aTodo: Todo = new Todo("bake my cake", false);
        let todos: Todo[] = [aTodo];

        mainFunctions.createHtml(todos);

        expect((document.querySelector("todo__text--done") as HTMLLIElement).innerHTML).toBe("bake my cake");

    })


})

describe("toggleTodo", ()=>{
    test("should call on createHTML", ()=>{
        //Arrange
        let sneakySpy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue();
        let aTodo: Todo = new Todo("bake my cake", false);
    
        //Act
        mainFunctions.toggleTodo(aTodo);
        //Assert
        expect(sneakySpy).toHaveBeenCalled();
    })
    test("should call on changeTodo", ()=>{
        //Arrange
        let sneakySpy = jest.spyOn(fnFunctions,"changeTodo").mockReturnValue();
        let aTodo: Todo = new Todo("bake my cake", false);
    
        //Act
        mainFunctions.toggleTodo(aTodo);
        //Assert
        expect(sneakySpy).toHaveBeenCalled();
    })


})

describe("displayError", ()=>{
    test("should add class show", ()=>{
        //Arrange

        document.body.innerHTML = `
        <div id="error" class="error"></div>
        `;
        let testText: string = "Error?";
        let testStatement: boolean = true;
        let errorContainer: HTMLDivElement = document.querySelector("error") as HTMLDivElement;

        //Act
        mainFunctions.displayError(testText, testStatement);

        //Assert
        expect(errorContainer.innerHTML).toBe("Error?");
    })
    test("should not add class show", ()=>{
        //Arrange

        document.body.innerHTML = `
        <div id="error" class="error"></div>
        `;
        let testText: string = "E";
        let testStatement: boolean = false;

        let errorContainer: HTMLDivElement = document.querySelector("error") as HTMLDivElement;

        //Act
        mainFunctions.displayError(testText, testStatement);

        //Assert
        expect(errorContainer.innerHTML).toBe("E");
    })
})

describe("clearTodos", ()=> {
    test("should call removeAllTodos", ()=>{

        let sneakySpy = jest.spyOn(fnFunctions, "removeAllTodos").mockReturnValue();
        let todos: Todo[] = [new Todo("bake a cake", false)];

        mainFunctions.clearTodos(todos);

        expect(sneakySpy).toHaveBeenCalled;
    })
    test("should call createHtml", ()=>{

        let sneakySpy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue();
        let todos: Todo[] = [new Todo("bake a cake", false)];

        mainFunctions.clearTodos(todos);

        expect(sneakySpy).toHaveBeenCalled;
    })
})
