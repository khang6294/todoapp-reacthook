import React, { useState,useEffect } from 'react';
import './App.css';
import Layout from './components/Layout'
import AddToDo from './components/ToDoStuffs/AddToDo'
import ToDoList from './components/ToDoStuffs/ToDoList'
import CalendarSchedule from './components/Calendar'
import 'antd/dist/antd.css';
import {useTodos} from './custom-hooks'
import IndexAuth from './components/Auth/indexAuth'
import Loader from './components/Loader/Loader'


const App = (props) => {

    const { toDoAndDate,
            userInfo,
            authLoading,
            toDoList,
            isAuth,
            userCreation,
            signup,
            login, 
            logout,
            edit, 
            addToDo, 
            removeToDo, 
            selectDate ,
            completeToDo,
            onSave
        } = useTodos();
    
    
    let renderView = null;
    const [loading,setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
    },[loading])

    if(!isAuth && authLoading){
        renderView = (
            <>
                <Loader/>
                <IndexAuth 
                    getLoginInfo = {(userInfo) => login(userInfo)}
                    getSignUpInfo = {(userInfo) => signup(userInfo)}
                    userCreation = {userCreation}
                    authLoading = {authLoading}
                />
            </>
        )
        
    }

    if(isAuth){
        renderView = (
            <Layout userInfo= {userInfo} onLogout = {logout}>
                <CalendarSchedule
                    toDoAndDate = {toDoAndDate}
                    dateSelected = {(date) => selectDate(date)}
                    toDoList = {toDoList}
                />
                <AddToDo
                    newToDo = {(newToDo) => addToDo(newToDo)} 
                    toDoList = {toDoList}
                    onSave = {onSave}
                    edit = {edit}
                />
                <ToDoList
                    toDoList = {toDoList}
                    deleteItem = {item => removeToDo(item)}
                    completeItem = {item => completeToDo(item)}
                />
            </Layout>
        )
    } else if(!isAuth && loading && !authLoading) {
        renderView = <IndexAuth 
            getLoginInfo = {(userInfo) => login(userInfo)}
            getSignUpInfo = {(userInfo) => signup(userInfo)}
            userCreation = {userCreation}
            authLoading = {authLoading}
        />
    } 
    
    return (
        <div className="App">
            {renderView}
        </div>
    );
}

export default App;
