import { create } from "zustand";

export const useStore = create((set) => ({
  user: null,
  postId: null,
  modalIsOpen: false,
  modalContent: null,
  posts: [],
  needsFetch: false,

  openModal: (content) => set({ modalIsOpen: true, modalContent: content }),
  closeModal: () => set({ modalIsOpen: false, modalContent: null }),
  setUser: (newUser) => set({ user: newUser }),
  setPostId: (newPostId) => set({ postId: newPostId }),
  setPosts: (newPosts) => set({ posts: newPosts }),
  setNeedsFetch: (value) => set({ needsFetch: value }),
}));
