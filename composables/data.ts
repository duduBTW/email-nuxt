export type UserDto = {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
};

export type EmailDto = {
  id: number;
  sender: UserDto;
  recievers: UserDto[];
  subject: string;
  content: string;
};

export type SendEmailDto = Pick<EmailDto, "id" | "content" | "subject"> & {
  sender: string;
  recievers: UserDto[];
};

const EMAIL_MOCK: EmailDto[] = [];
// const EMAIL_MOCK: EmailDto[] = [
//   {
//     content: "",
//     id: "1",
//     recievers: [
//       {
//         email: "my@email.com",
//         id: "2",
//         name: "Dudu",
//         profilePicture:
//           "https://pbs.twimg.com/profile_images/1620171210352128000/sOhJS_q8_400x400.jpg",
//       },
//     ],
//     sender: {
//       email: "twitter@comp.com",
//       id: "1",
//       name: "X",
//       profilePicture:
//         "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_400x400.jpg",
//     },
//     subject: "Noam Levy just posted something that might be of interest to you",
//   },
//   {
//     content: "",
//     id: "2",
//     recievers: [
//       {
//         email: "my@email.com",
//         id: "2",
//         name: "Dudu",
//         profilePicture:
//           "https://pbs.twimg.com/profile_images/1620171210352128000/sOhJS_q8_400x400.jpg",
//       },
//     ],
//     sender: {
//       email: "test@teste.com",
//       id: "1",
//       name: "hamazi__",
//       profilePicture:
//         "https://pbs.twimg.com/profile_images/1563859991215341568/eI7JvHcT_400x400.jpg",
//     },
//     subject: "Hey look an email, Bocchi!",
//   },
//   {
//     content: "",
//     id: "3",
//     recievers: [
//       {
//         email: "my@email.com",
//         id: "2",
//         name: "Dudu",
//         profilePicture:
//           "https://pbs.twimg.com/profile_images/1620171210352128000/sOhJS_q8_400x400.jpg",
//       },
//     ],
//     sender: {
//       email: "test@teste.com",
//       id: "1",
//       name: "hamazi__",
//       profilePicture:
//         "https://pbs.twimg.com/profile_images/1563859991215341568/eI7JvHcT_400x400.jpg",
//     },
//     subject: "Hey look an email, Bocchi!",
//   },
// ];

export const MOCK_DATA = {
  email: EMAIL_MOCK,
} as const;
