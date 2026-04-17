import "./App.css";
import Login from "./pages/Login/login";
import Home from "./pages/Home/Home";
import CreateDeck from "./pages/createDeck/createDeck";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Layout from "./components/Layout/Layout";
import { IconProvider } from "./components/icons/iconContext.jsx";
import Subscribe from "./pages/Subscribe/subscribe.jsx";
import NotFound from "./pages/pageNotFound/notFound.jsx";
import Statistics from "./pages/Statistics/stats.jsx";
import DeckPage from "./pages/DeckPage/deckPage.jsx";
import CreateCard from "./pages/createCard/createCard.jsx";
import Study from "./pages/Study/study.jsx";
import Library from "./pages/Library/library.jsx";

function App() {
  return (
    <>
      <IconProvider>
        <div className="appMain">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/subscribe" element={<Subscribe />} />

            <Route element={<Layout />}>
              <Route path="/home/" element={<Home />} />
              <Route path="/profile/*" element={<Profile />} />
              <Route path="/stats" element={<Statistics />} />
              <Route path="/library" element={<Library />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/home/deckui" element={<DeckPage />} />
            <Route path="/createcard" element={<CreateCard />} />
            <Route path="/create" element={<CreateDeck />} />
            <Route path="study" element={<Study />} />
          </Routes>
        </div>
      </IconProvider>
    </>
  );
}

export default App;
