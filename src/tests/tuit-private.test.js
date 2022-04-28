import {
    findAllTuits,
    findTuitById,
    findTuitByUser,
    createTuit,
    updateTuit,
    deleteTuit,
  } from "../services/tuits-service";
  
  import {
    createUser,
    deleteUsersByUsername,
    findAllUsers,
    findUserById,
  } from "../services/users-service";
import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import axios from "axios";
import Tuit from "./Tuit-mock-private";

jest.mock('axios');

const MOCKED_USERS = [
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
  ]

  const MOCKED_TUIT = [
    { tuit: "alice's tuit", _id: "99871",isPrivate:true },
    { tuit: "alice'1s tuit", _id: "998711",isPrivate:true }
  ];
  
  test('tuit list renders static tuit array', () => {
    // TODO: implement this
    render(
        <HashRouter>
        <Tuit tuits={MOCKED_TUIT}/>
      </HashRouter>
    );
    const linkElement = screen.getByText(/alice's tuit/i);
    expect(linkElement).toBeInTheDocument() ;

  });
  
  


  

