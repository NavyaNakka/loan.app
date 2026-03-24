
// import UserInfo from "../models/UserInfo.js";
// import UserStatusHistory from "../models/UserStatusHistory.js";

// // 🔥 APPLY LOAN + USER CREATION + MAPPING
// export const applyLoan = async (req, res) => {
//   try {
//     const { sessionId, ...formData } = req.body;

//     let user;

//     // ✅ 1. CHECK if user already exists (based on phone)
//     const existingUser = await UserInfo.findOne({
//       phone: formData.phone,
//     });

//     if (existingUser) {
//       user = existingUser;

//       // 🔥 update sessionId (latest browser session)
//       if (sessionId) {
//         user.sessionId = sessionId;
//         await user.save();
//       }

//     } else {
//       // ✅ 2. CREATE new user
//       user = await UserInfo.create({
//         ...formData,
//         sessionId: sessionId || null,
//       });
//     }

//     // ✅ 3. MAP all previous actions to this userId
//     if (sessionId) {
//       await UserStatusHistory.updateMany(
//         { sessionId },
//         { userId: user._id }
//       );
//     }

//     // ✅ 4. RESPONSE
//     res.status(200).json({
//       success: true,
//       userId: user._id,
//       user,
//     });

//   } catch (err) {
//     console.error("❌ APPLY LOAN ERROR:", err); // 🔥 important for debugging

//     res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };
// 
// 
import UserInfo from "../models/UserInfo.js";
import UserStatusHistory from "../models/UserStatusHistory.js";

export const applyLoan = async (req, res) => {
  try {
    const { sessionId, ...formData } = req.body;
    const phone = String(formData.phone);

    // ✅ Consent validation
    if (!formData.acceptedTerms) {
      return res.status(400).json({
        message: "Please accept terms and conditions",
      });
    }

    let user;

    const existingUser = await UserInfo.findOne({ phone });

    if (existingUser) {
      // ✅ UPDATE existing user (IMPORTANT FIX)
      user = await UserInfo.findOneAndUpdate(
        { phone },
        {
          ...formData,                 // ✅ includes acceptedTerms
          phone,
          sessionId,
          consentAt: new Date(),       // ✅ update timestamp
        },
        { new: true }
      );

    } else {
      // ✅ Create new user
      user = await UserInfo.create({
        ...formData,
        phone,
        sessionId,
        consentAt: new Date(),         // ✅ add timestamp
      });
    }

    // ✅ Link session to user
    if (sessionId) {
      await UserStatusHistory.updateMany(
        { sessionId },
        { userId: user._id }
      );
    }

    res.json({
      success: true,
      userId: user._id,
      user,
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};