# Deployement : [Deployed at](https://mohnishraj317.github.io/pokebattle/)
# Video link : [Preview](https://www.loom.com/share/ff649ebb60924a9a9479da7cf7d1c40c?sid=88be521a-9233-4640-91fd-05a074f76ced)

---
# **Task 1: Display Pokémon Cards**

### **Subtask 1**
Created a web page to display **15 Pokémons** as cards.

Each **Pokémon Card** includes:
- **Name**: The name of the Pokémon.
- **Image**: The front image of the Pokémon.
- **Cry Sound**: Pokémon's latest cry sound on clicking on the card.

### **Subtask 2**
When a user clicks on a Pokémon card, detailed modal is displayed with comprehensive information about the selected Pokémon.

This **Detailed View** must includes:
- **Name**: The Pokémon's name.
- **Height**: The height of the Pokémon (in decimeters or meters).
- **Weight**: The weight of the Pokémon (in hectograms or kilograms).
- **Base Stats**: Key stats such as HP, Attack, Defense, Speed.
- **Abilities**: Include any hidden abilities.
- **Moves**: A list of moves the Pokémon can learn.
---

# **Task 2: Battle Simulation**

### **Subtask 1**  
Allows users to select **two Pokémon** by clicking on their respective cards. When a Pokémon card is selected, the cards are visually highlighted.

### **Subtask 2: Initiate a Battle**  
Implemented a **"Battle" button** that initiates the battle between the two selected Pokémon.

#### **Battle Logic**:
- **Move Selection**: Randomly selects a move from the list of available moves for each Pokémon.
- **Damage Calculation Formula**:

    ![Damage Calculation Formula](https://s3.amazonaws.com/hr-assets/0/1727503131-68a5aa8839-unnamed.jpg)

    **Where**:
  - **Level**: Assumes a constant level of **50** for both Pokémon.
  - **Attack**: The attacking Pokémon's Attack stat.
  - **Defense**: The defending Pokémon's Defense stat.
  - **Move Power**: The power of the move being used by the attacking Pokémon.
  - **Type Effectiveness**: A multiplier based on the move's type and the defending Pokémon’s type.
  - **Accuracy**: The accuracy of the move being used (e.g., 1.0 for 100% accuracy).
  - **Speed**: The speed stat of the attacking Pokémon.

#### **Type Effectiveness**:
The **type effectiveness** of a move is determined by the interaction between the **attacking Pokémon's move type** and the **defending Pokémon's type**. This multiplier significantly impacts the **damage calculation** and can fall into three categories:
- **Super Effective (2.0x multiplier)**:  
  If the attacking Pokémon's move type is **strong against** the defending Pokémon’s type (e.g., a Fire-type move against a Grass-type Pokémon), apply a **2.0x multiplier** to double the damage.
- **Neutral (1.0x multiplier)**:  
  If the attacking Pokémon's move type has **no specific advantage or disadvantage** against the defending Pokémon's type (e.g., a Normal-type move against a Grass-type Pokémon), apply a **1.0x multiplier**, leaving the damage unchanged.
- **Not Very Effective (0.5x multiplier)**:  
  If the attacking Pokémon's move type is **weak against** the defending Pokémon's type (e.g., a Fire-type move against a Water-type Pokémon), apply a **0.5x multiplier** to halve the damage.

### **Subtask 3: Battle Summary**  
After the battle, a **summary** is displayed with :
- The **winner**
- **Move used** by each Pokémon.
- **Damage caused** by each Pokémon.

---
