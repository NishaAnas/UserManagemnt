import { timeStamp } from "console";
import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQArwMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgMEAQUH/8QAKhABAAICAQMCBQQDAAAAAAAAAAECAxEhBDFRMkESImFxkROBobEUM1L/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAA5uPJuPIOgAAAAAAAAAAAAAAAI2vEfVC1/aEASm8z9EdzPcAAAdiZjtKUZJjjugAuraLdpSZ/sspf2kFgAAAAAAAAACq9tzqOyWS2o0qAAABy1orG7TqAdFM9TSO0TMeSOopPmPqC4ciYnmJ3DoAALMdvaVjP7rqW+KASAAAAAABG06rIKrTu0uAAACN7xSk2nsw3vN53P4X9XbmtfbXLMAAqJ4sk47RMcx7w3VmLRuOYl5zX0lt45jxKKvAASxzqyJE6nYNA5XmHQAAAAEMnpTQy+kFQAAAMnV/wCyv2UNPV14rfxGmZQAEGno+12Zs6Suscz5kFwCKAAupPywkjj9EJAAAAAI3j5ZScmNxMAoCY0AAA5aItWaz2liy4rY57TNfLd2jlCclO02r+QYBsmOnnv8P7SVjBXmJrv7gpw4ZvO7RMV/tsjiNI/qUnteu/ulHIAAAO1jdogF1fTDoAAAAAAAqyRqd+UF9o3GlMxqdA4pzZ/0/lr6v6WZb/p45t+HnzzO55kErXted2mZlEFQAASpkvT02mEQG3DljJHi0d4WvOraa2i0d4ehWYtETHaUV1ZijXMoVj4pXRGo0DoAAAAAAACN6/FH1SAYOt3WsRPvLI9bLirlrq37T4YM3S5MfMR8VfMKKABAAADvxHfwA3dJu2KPpKrD0d785Plr/Lfjx1x1itI1EIpWuoSAAAAAAAAAAAAAFWTp8WTm1Y35jhRboaz6bzH35bAGD/Bv/wB1/B/g2971/DeAyU6Gseq0z/C/Hix4/RWIWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Z",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
