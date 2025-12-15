# 🚓 AI-Based Witness-Guided Vehicle Re-Identification System

An AI-powered computer vision system that uses **witness descriptions** (vehicle color, brand, and type) to **identify and re-identify vehicles across CCTV and traffic cameras**, even when license plates are not visible.

This project demonstrates how **deep visual appearance features** trained on the **Stanford Cars Dataset** can be combined with real-time surveillance footage to support **crime scene investigation**.

---

## 📌 Problem Statement

During crime investigations, witnesses often provide only **visual descriptions** of vehicles such as:

> *“A white car, possibly a Toyota, was seen near the crime scene.”*

Traditional systems rely heavily on **license plate recognition**, which fails in:

* Low resolution videos
* Occlusion
* Motion blur
* Night-time conditions

This project addresses that limitation using **Vehicle Re-Identification (ReID)** based on **visual features**.

---

## 🎯 Objectives

* Detect vehicles from CCTV and traffic camera footage
* Extract vehicle appearance features (color, brand, model)
* Use witness-provided information to guide vehicle search
* Re-identify the same vehicle across multiple cameras
* Support identification of **any car brand**, not limited to a single manufacturer

---

## 🧠 System Overview

**```
Witness Description (Text Input)
        ↓
Vehicle Detection (YOLO)
        ↓
Feature Extraction (CNN)
        ↓
Vehicle Appearance Embeddings
        ↓
Feature Matching & Similarity Scoring
        ↓
Vehicle Re-Identification Across Camera**s
```

---
**
## 🗂️ Dataset Used

### **Stanford Cars Dataset**

* **16,185 images**
* **196 car classes**
* Covers multiple brands including:

  * Toyota
  * Hyundai
  * Honda
  * BMW
  * Audi
  * Mercedes
  * Ford

📌 **Usage in this project:**

* Train a CNN to learn fine-grained vehicle appearance features
* Extract deep embeddings used for vehicle re-identification

> Note: While Stanford Cars is a classification dataset, the learned embeddings are used for similarity-based vehicle ReID.

---

## 🔧 Technologies & Tools

| Component            | Technology                  |
| -------------------- | --------------------------- |
| Programming Language | Python                      |
| Vehicle Detection    | YOLOv8                      |
| Feature Extraction   | CNN (ResNet / MobileNet)    |
| Computer Vision      | OpenCV                      |
| Similarity Matching  | Cosine Similarity           |
| Dataset              | Stanford Cars Dataset       |
| UI Demo              | Lovable (Prototype Preview) |

---

## 🧩 Key Features

* ✅ Witness-guided vehicle search
* ✅ Brand and model recognition
* ✅ Color-based filtering
* ✅ Vehicle Re-Identification across multiple cameras
* ✅ Works without license plate recognition
* ✅ Supports multiple car brands and models

---

## 🖥️ Demo Workflow

1. Witness enters vehicle details (color, brand, type)
2. System analyzes CCTV and traffic camera footage
3. Vehicles are detected and features are extracted
4. Visual features are matched with witness description
5. Matching vehicles are displayed with confidence scores
6. Same vehicle is re-identified across different cameras

---

## 📊 Sample Output**

```
Vehicle Match Found

Vehicle Type: Car
Color: White
Brand: Toyota
Model: Corolla
Camera ID: CCTV-03
Time Detected: 18:42:11
Match Confidence: 93%
Status: MATCH FOUND
```

---

## 🚨 Use Cases

* Crime scene investigation
* Hit-and-run analysis
* Smart city surveillance
* Traffic monitoring systems
* Law enforcement support systems

---

## ⚠️ Challenges & Limitations

* Low-light and blurred footage
* Occluded vehicle logos
* Similar-looking car models
* Witness description ambiguity

---

## 🔮 Future Enhancements

* Integration with Vehicle ReID datasets (VeRi-776, VehicleID)
* Multi-camera tracking with DeepSORT
* Text-to-Video retrieval using CLIP
* Real-time RTSP camera integration
* License plate recognition as an optional module

---

## 📘 Type of Study

* Applied Artificial Intelligence
* Computer Vision
* Surveillance Analytics
* Deep Learning–based Vehicle Re-Identification

---

## 🧑‍🎓 Academic Note

This project is developed for **educational and research purposes** to demonstrate the application of AI in real-world crime investigation scenarios.

---

## 👤 Author

**Karivaradhan**
B.Tech – Electronics and Communication Engineering
AI & Computer Vision Enthusiast

---

## 📄 License

This project is licensed for **academic and non-commercial use only**.

---

### ⭐ If you like this project, consider giving it a star!


