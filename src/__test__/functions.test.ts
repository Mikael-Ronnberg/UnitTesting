import { Todo } from "../ts/models/Todo";
import * as fnFunctions from "./../ts/functions";


describe("addTodo", ()=>{
    
    test("should add Todo", ()=>{
        
        let testText = "Bake my cake";
        let aTodo: Todo = new Todo(testText, false);
        let myList: Todo[] = [];
        
        let fnTest = fnFunctions.addTodo(testText, myList);
        
        expect(fnTest).toStrictEqual({"error": "Du måste ange minst två bokstäver", "success": true});
    })
    
    test("should not add Todo", ()=>{
        let testText = "B";
        let aTodo: Todo = new Todo(testText, false);
        let myList: Todo[] = [];
        
        let fnTest = fnFunctions.addTodo(testText, myList);
        
        expect(fnTest).toStrictEqual({"error": "Du måste ange minst två bokstäver", "success": false});
    })
    
})

test("should change todo status",()=>{
    //Arrange
    let aTodo = new Todo("make a cake", false);

    //Act
    fnFunctions.changeTodo(aTodo);

    //Assert
    expect(aTodo.done).toBe(true);
});

test("should remove todos", ()=> {

    let aTodo = new Todo("make my cake", false);
    let myList: Todo[] = [aTodo];

    fnFunctions.removeAllTodos(myList);

    expect(myList.length).toBe(0);

})