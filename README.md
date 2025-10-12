# 🚀 Nexa Workshop - Student Learning Platform

**Build your first decentralized application on Nexa blockchain!**

---

## 🎯 What is This?

An **interactive workshop** for students to learn blockchain development on Nexa through:
- ✅ **2 guided projects** with step-by-step tutorials
- ✅ **Production-ready playground** for testing
- ✅ **Real blockchain integration** using official Nexa SDK
- ✅ **Beautiful UI** with modern design

---

## ⚡ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open in Browser

```
http://localhost:3001
```

---

## 📚 Workshop Structure

### **Main Pages:**

| Page | URL | Description |
|------|-----|-------------|
| **Home** | `/` | Landing page with workshop overview |
| **Workshop** | `/workshop` | Project selection and overview |
| **Project 1** | `/workshop/project-1` | Token Transfer with Timeout |
| **Project 2** | `/workshop/project-2` | P2PKT Payment Contract |
| **Playground** | `/playground` | Live testing with real blockchain |

---

## 🎓 Student Learning Path

```
1. HOME
   ↓
   Click "Start Workshop"
   ↓
2. WORKSHOP
   ↓
   Choose Project 1 or 2
   ↓
3. PROJECT TUTORIAL
   ↓
   Follow 5 steps:
   - Write contract
   - Install tools
   - Compile
   - Integrate JavaScript
   - Test
   ↓
4. PLAYGROUND
   ↓
   - Generate HD wallet (12-word seed)
   - See real balance from blockchain
   - Send real testnet transactions
   - View transaction results
   ↓
5. SUCCESS! 🎉
```

---

## 🔧 Technology Stack

### **Official Nexa SDK:**

```json
{
  "nexa-wallet-sdk": "✅ Complete wallet functionality",
  "libnexa-ts": "✅ Additional crypto utilities",
  "@nexscript/nexscript": "✅ Smart contract support"
}
```

### **Frontend:**

```json
{
  "Next.js 15": "✅ React framework",
  "TypeScript": "✅ Type safety",
  "Tailwind CSS": "✅ Styling",
  "shadcn/ui": "✅ UI components",
  "Framer Motion": "✅ Animations"
}
```

---

## 🎯 Features

### **Playground Features:**

✅ **HD Wallet Creation**
- Generate 12-word seed phrases
- BIP44 standard derivation
- Secure key generation

✅ **Wallet Restoration**
- Import from seed phrase
- Recover all accounts
- Same addresses restored

✅ **Real Blockchain Integration**
- Rostrum network provider
- Real balance from testnet
- Live UTXO fetching

✅ **Transaction Support**
- Build transactions
- Sign with wallet
- Broadcast to network
- View transaction ID

✅ **Beautiful UI**
- Responsive design
- Loading states
- Error handling
- Copy to clipboard

---

## 📖 Projects

### **Project 1: Simple Token Transfer**

**Duration:** 30 minutes
**Difficulty:** Beginner

**Learn:**
- Writing NexScript contracts
- Time-based constraints
- Signature verification
- Transaction building

**Contract:**
```nexscript
contract TransferWithTimeout(pubkey sender, pubkey recipient, int timeout) {
  function transfer(sig recipientSig) {
    require(checkSig(recipientSig, recipient));
  }
  
  function timeout(sig senderSig) {
    require(checkSig(senderSig, sender));
    require(tx.time >= timeout);
  }
}
```

### **Project 2: P2PKT Payment**

**Duration:** 25 minutes
**Difficulty:** Beginner

**Learn:**
- Pay-to-Public-Key-Template
- Hash functions (hash160)
- Basic payment contracts
- Public key verification

**Contract:**
```nexscript
contract P2PKT(bytes20 pkh) {
  function spend(pubkey pk, sig s) {
    require(hash160(pk) == pkh);
    require(checkSig(s, pk));
  }
}
```

---

## 🎮 How to Use the Playground

### **Generate Wallet:**

1. Go to `/playground`
2. Click **"Generate New Wallet"**
3. Wallet SDK creates:
   - 12-word seed phrase
   - HD wallet
   - First account (1.0)
   - Real Nexa address

4. **Save your seed phrase!** (12 words)

### **Check Balance:**

1. Wallet automatically fetches balance
2. Click "Refresh" to update
3. Balance shown in NEXA

### **Send Transaction:**

1. Enter recipient address
2. Enter amount in NEXA
3. Click "Send Transaction"
4. Wallet SDK:
   - Fetches your UTXOs
   - Builds transaction
   - Signs with your key
   - Broadcasts to network
5. Get transaction ID!

---

## 🔐 Security

### **What's Secure:**

- ✅ Client-side wallet generation
- ✅ Seed phrases never sent to server
- ✅ Private keys stay in browser
- ✅ Transaction signing in browser

### **For Students:**

⚠️ **This is TESTNET** - No real money
⚠️ **For learning only** - Not for production storage
⚠️ **Save your seed phrase** - It's your only backup!

---

## 📊 Current Status

| Feature | Status |
|---------|--------|
| Wallet Generation | ✅ Production |
| Seed Phrases | ✅ Production |
| Wallet Restore | ✅ Production |
| Balance Fetching | ✅ Production |
| Address Validation | ✅ Production |
| Transaction Building | ✅ Production |
| Transaction Signing | ✅ Production |
| Broadcasting | ✅ Production |
| UI/UX | ✅ Production |

**Everything is PRODUCTION-READY!** 🎉

---

## 🚧 Future Enhancements

### Possible Additions:

- [ ] Smart contract deployment UI
- [ ] Token creation/management
- [ ] Multiple account display
- [ ] Transaction history
- [ ] QR code generation
- [ ] Hardware wallet support
- [ ] Multi-signature wallets

---

## 📚 Documentation

| File | Description |
|------|-------------|
| `OFFICIAL_SDK_IMPLEMENTATION.md` | Official SDK guide |
| `START_HERE.md` | Quick start guide |
| `WORKSHOP_README.md` | Student guide |
| `API_ARCHITECTURE.md` | Technical architecture |
| `TROUBLESHOOTING.md` | All fixes documented |

---

## 🎊 Credits

**Built with:**
- [Nexa Wallet SDK](https://gitlab.com/nexa/wallet-sdk-ts) - Official wallet library
- [NexScript](https://docs.nexscript.org/) - Smart contract language
- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components

---

## 📞 Support

**Resources:**
- Official Nexa SDK: https://gitlab.com/nexa/wallet-sdk-ts
- NexScript Docs: https://docs.nexscript.org/
- Nexa Website: https://nexa.org/

---

## ⚡ TL;DR

```bash
# 1. Install
npm install

# 2. Run
npm run dev

# 3. Open
http://localhost:3001/playground

# 4. Test
- Click "Generate New Wallet"
- See 12-word seed phrase
- Check real balance
- Send transactions
- Learn blockchain!
```

---

## 🎉 Status

**PRODUCTION-READY FOR STUDENTS!**

✅ Official Nexa Wallet SDK integrated
✅ Real blockchain operations
✅ Complete transaction support
✅ Beautiful, professional UI
✅ Comprehensive tutorials
✅ Zero errors

**Ready to teach blockchain development!** 🚀

---

**Made with ❤️ for Nexa education**


