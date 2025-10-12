# Nexa Workshop - Student Guide

Welcome to the Nexa Workshop! This interactive learning platform helps students build their first decentralized applications (dApps) on the Nexa blockchain using NexScript.

## 🎯 Workshop Structure

### Main Pages

1. **Home (`/`)** - Landing page with overview of the workshop
2. **Workshop (`/workshop`)** - Main workshop page with project selection
3. **Playground (`/playground`)** - Testing environment for contracts
4. **Projects** - Step-by-step guided tutorials

### 📚 Available Projects

#### Project 1: Simple Token Transfer
**Location:** `/workshop/project-1`

Learn to create a smart contract with time-based transfer controls.

**Topics Covered:**
- Writing basic NexScript contracts
- Public keys and signatures
- Time-based constraints (timelock)
- Compiling contracts
- JavaScript integration

**Contract Features:**
- Recipient can claim funds anytime
- Sender can reclaim after timeout period
- Demonstrates `checkSig()` and `tx.time`

#### Project 2: Pay-to-Public-Key (P2PKT)
**Location:** `/workshop/project-2`

Build a simple payment contract with signature verification.

**Topics Covered:**
- Understanding P2PKT (Pay-to-Public-Key-Template)
- Hash functions (`hash160`)
- Public key verification
- Basic payment flows

**Contract Features:**
- Uses public key hash for privacy
- Requires signature to spend
- Demonstrates basic payment pattern

## 🧪 Testing Playground

**Location:** `/playground`

The testing playground provides:

### Features
1. **Wallet Manager**
   - Create new testnet wallet
   - Import existing wallet
   - View address, public key, private key
   - Mock testnet balance (100,000 NEXA)

2. **Simple Transfer**
   - Send NEXA to addresses
   - View transaction details
   - Transaction history
   - Mock transaction execution

3. **Advanced (Coming Soon)**
   - Deploy custom contracts
   - Interact with deployed contracts
   - Token operations

## 🚀 Getting Started for Students

### Step 1: Start the Development Server
```bash
npm run dev
```

### Step 2: Navigate to the Workshop
1. Go to `http://localhost:3000`
2. Click "Start Workshop"
3. Choose a project

### Step 3: Follow Project Instructions
Each project has 5 main steps:
1. Write the smart contract
2. Install tools
3. Compile the contract
4. Integrate with JavaScript
5. Test in playground

### Step 4: Test Your Contract
1. Click "Test in Playground"
2. Create or import a wallet
3. Try the simple transfer feature
4. View transaction results

## 📁 File Structure

```
app/
├── page.tsx                    # Home page
├── workshop/
│   ├── page.tsx               # Workshop main page
│   ├── project-1/
│   │   └── page.tsx          # Project 1: Token Transfer
│   └── project-2/
│       └── page.tsx          # Project 2: P2PKT
└── playground/
    └── page.tsx               # Testing playground

components/
├── hero.tsx                   # Landing hero section
├── workshop-preview.tsx       # Workshop preview cards
├── getting-started.tsx        # Setup instructions
└── playground/
    ├── wallet-manager.tsx     # Wallet creation/import
    └── simple-transfer.tsx    # Transfer interface
```

## 🎓 Learning Path

### For Beginners
1. Start with **Project 1: Token Transfer**
   - Introduces basic concepts
   - Simple contract structure
   - Easy to understand

2. Move to **Project 2: P2PKT**
   - Builds on Project 1
   - Introduces hash functions
   - More advanced verification

### Key Concepts to Learn

#### 1. Smart Contract Basics
- Pragma directives
- Contract parameters
- Functions and signatures
- Require statements

#### 2. Cryptography
- Public/private keys
- Signatures (`sig`, `checkSig()`)
- Hash functions (`hash160()`, `sha256()`)

#### 3. Time Controls
- Transaction time (`tx.time`)
- Block height
- Timeout mechanisms

#### 4. Transaction Building
- Contract instantiation
- Function calls
- Output specification
- Transaction sending

## 🔧 Development Features

### Mock Data
The playground uses mock data for demonstration:
- Simulated wallet generation
- Mock transaction execution
- Testnet addresses
- No real blockchain interaction (yet)

### For Production
To connect to real Nexa testnet:
1. Install actual NexScript SDK
2. Configure ElectrumNetworkProvider
3. Use real key generation
4. Connect to testnet nodes

## 📝 Contract Examples

### Project 1: TransferWithTimeout
```nexscript
pragma nexscript ^0.1.0;

contract TransferWithTimeout(
  pubkey sender, 
  pubkey recipient, 
  int timeout
) {
  function transfer(sig recipientSig) {
    require(checkSig(recipientSig, recipient));
  }

  function timeout(sig senderSig) {
    require(checkSig(senderSig, sender));
    require(tx.time >= timeout);
  }
}
```

### Project 2: P2PKT
```nexscript
pragma nexscript ^0.1.0;

contract P2PKT(bytes20 pkh) {
  function spend(pubkey pk, sig s) {
    require(hash160(pk) == pkh);
    require(checkSig(s, pk));
  }
}
```

## 🎨 UI Components

### Workshop Preview
- Feature cards (Learn, Build, Test)
- Project overview
- Call-to-action buttons

### Project Pages
- Step-by-step instructions
- Code examples with syntax highlighting
- Installation commands
- Learning objectives
- Navigation between projects

### Playground
- Wallet management interface
- Transaction builder
- Result display
- Transaction history

## 🔗 Navigation Flow

```
Home → Workshop → Project Selection → Project Steps → Playground
  ↓                    ↓                                    ↓
Getting Started    Testing Button                    Wallet Creation
                                                           ↓
                                                    Simple Transfer
```

## 💡 Tips for Students

1. **Follow in Order**: Complete Project 1 before Project 2
2. **Read Carefully**: Each step has important explanations
3. **Test Frequently**: Use the playground to verify understanding
4. **Experiment**: Try modifying the contracts
5. **Ask Questions**: Use the documentation links

## 🚧 Future Enhancements

- [ ] Real testnet integration
- [ ] More projects (escrow, voting, etc.)
- [ ] Contract deployment interface
- [ ] Interactive code editor
- [ ] Video tutorials
- [ ] Quizzes and challenges
- [ ] Student progress tracking

## 📚 Additional Resources

- [NexScript Documentation](https://docs.nexscript.org)
- [Nexa Playground](https://playground.nexscript.org/)
- [GitHub Examples](https://github.com/nexscript/examples)

## 🆘 Troubleshooting

### Common Issues

**Q: Wallet not creating?**
A: Refresh the page and try again. This is a demo using mock data.

**Q: Transaction not sending?**
A: This is a simulated environment. Transactions are mocked for learning purposes.

**Q: Code not compiling?**
A: Check syntax carefully. Ensure you have the correct pragma version.

## 📄 License

This workshop is educational material for learning NexScript development.

---

**Ready to build your first dApp?** Start at `/workshop` and choose your first project!


