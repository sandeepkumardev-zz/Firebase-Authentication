export const initialState = {
  user: {
    uid: "63hft45483hd73hdb342",
    userName: "Sandy",
    email: "sandeepypb@gmail.com",
    img: "https://softdevsandy.me/favicon.ico",
  },
  data: {
    bookmarks: [
      {
        id: 4321754325478,
        title: "Personal",
        url: "https://softdevsandy.me",
        img: "https://softdevsandy.me/favicon.ico",
      },
      {
        id: 43215234575478,
        title: "Google",
        url: "https://google.com",
        img: "https://google.com/favicon.ico",
      },
    ],
    categories: [
      { id: 328, name: "Personal" },
      { id: 329, name: "Google" },
      { id: 330, name: "Design" },
    ],
  },
};
export const initialStatee = {
  user: null,
  data: {
    bookmarks: [],
    categories: [],
  },
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOKMARK":
      return state;
    default:
      return state;
  }
};
