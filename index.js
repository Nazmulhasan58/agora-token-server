const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-token');

const app = express();
const PORT = process.env.PORT || 3000;

// আপনার অ্যাগোরার App ID এবং Primary Certificate
const APP_ID = "703716fc3bb444fb97777cb388a7abd0";
const APP_CERTIFICATE = "5add5fc48c7e474498eb303b1d3949c8"; // আপনার সার্টিফিকেটটি এখানে বসাবেন

app.get('/rtcToken', (req, res) => {
  const channelName = req.query.channelName;
  if (!channelName) {
    return res.status(400).json({ error: 'channelName is required' });
  }

  const role = RtcRole.PUBLISHER;
  const privilegeExpiredTs = Math.floor(Date.now() / 1000) + 3600; // ১ ঘণ্টা ভ্যালিডিটি

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    0,
    role,
    privilegeExpiredTs
  );

  return res.json({ rtcToken: token });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
