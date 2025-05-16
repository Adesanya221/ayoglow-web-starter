import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, Sparkles } from "lucide-react";

type Question = {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    value: string;
  }[];
};

type Result = {
  type: string;
  title: string;
  description: string;
  recommendedProducts: string[];
  image: string;
};

const QUIZ_QUESTIONS: Question[] = [
  {
    id: "skin-type",
    text: "How would you describe your skin type?",
    options: [
      { id: "dry", text: "Dry - Often feels tight or flaky", value: "dry" },
      { id: "oily", text: "Oily - Shiny, especially in T-zone", value: "oily" },
      { id: "combination", text: "Combination - Oily T-zone, dry cheeks", value: "combination" },
      { id: "normal", text: "Normal - Neither too dry nor too oily", value: "normal" },
      { id: "sensitive", text: "Sensitive - Easily irritated or reactive", value: "sensitive" }
    ]
  },
  {
    id: "concern",
    text: "What's your primary skin concern?",
    options: [
      { id: "aging", text: "Signs of aging (fine lines, wrinkles)", value: "aging" },
      { id: "hydration", text: "Lack of hydration or moisture", value: "hydration" },
      { id: "acne", text: "Acne or breakouts", value: "acne" },
      { id: "evenness", text: "Uneven tone or dark spots", value: "evenness" },
      { id: "texture", text: "Rough texture or large pores", value: "texture" }
    ]
  },
  {
    id: "preferred-texture",
    text: "What product texture do you prefer?",
    options: [
      { id: "lightweight", text: "Lightweight, quick-absorbing", value: "lightweight" },
      { id: "rich", text: "Rich and creamy", value: "rich" },
      { id: "oil", text: "Oil-based products", value: "oil" },
      { id: "gel", text: "Gel or water-based", value: "gel" },
      { id: "no-preference", text: "No strong preference", value: "no-preference" }
    ]
  }
];

const QUIZ_RESULTS: Record<string, Result> = {
  "dry-hydration": {
    type: "Dry + Hydration Seeking",
    title: "The Moisture Lover",
    description: "Your skin craves deep hydration and nourishment. Our moisture-rich formulas with shea butter and baobab oil will help restore your skin's natural barrier.",
    recommendedProducts: ["Shea Butter Moisturizer", "Baobab Oil Serum", "Marula Hydrating Mask"],
    image: "/images/hero/girlf.jpg"
  },
  "oily-acne": {
    type: "Oily + Acne Prone",
    title: "The Clear Skin Seeker",
    description: "Your skin needs balance and clarification. Our tea tree and clay-based formulas will help control excess oil while clearing breakouts.",
    recommendedProducts: ["African Black Soap", "Tea Tree Toner", "Clay Purifying Mask"],
    image: "/images/hero/newp.jpg"
  },
  "combination-evenness": {
    type: "Combination + Evening Tone",
    title: "The Glow Getter",
    description: "Your skin needs balanced formulas that brighten while addressing multiple concerns. Our vitamin C and plant extract blends will help even tone without disrupting your skin's balance.",
    recommendedProducts: ["Vitamin C Serum", "Papaya Enzyme Exfoliator", "Marula Balancing Oil"],
    image: "/images/hero/istockphoto-2159948396-612x612.jpg"
  },
  "sensitive-texture": {
    type: "Sensitive + Texture Concerns",
    title: "The Gentle Refiner",
    description: "Your skin needs gentle yet effective formulas that smooth without irritation. Our soothing botanical blends will improve texture while calming sensitivity.",
    recommendedProducts: ["Aloe Vera Gel", "Oat Gentle Exfoliant", "Calendula Soothing Cream"],
    image: "/images/hero/lumin.jpg"
  },
  "default": {
    type: "Custom Skincare",
    title: "Your Custom Routine",
    description: "Based on your unique skin profile, we've selected products that will work together to address your specific needs and preferences.",
    recommendedProducts: ["Shea Butter Moisturizer", "African Black Soap", "Baobab Oil Serum"],
    image: "/images/hero/girlf.jpg"
  }
};

const SkinQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  
  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizComplete(true);
    }
  };
  
  const getResult = (): Result => {
    const skinType = answers["skin-type"] || "";
    const concern = answers["concern"] || "";
    
    const key = `${skinType}-${concern}`;
    return QUIZ_RESULTS[key] || QUIZ_RESULTS["default"];
  };
  
  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setQuizComplete(false);
  };
  
  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const result = getResult();
  
  return (
    <section className="py-16 bg-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block py-1 px-3 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-2">
            Personalized Skincare
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-3">
            Find Your Perfect Match
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Take our quick skin quiz to discover the ideal products for your unique skin needs
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {!quizComplete ? (
            <div className="p-6 md:p-8">
              {/* Progress indicator */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                  <span className="text-sm font-medium text-primary">{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Question */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">{currentQuestion.text}</h3>
                
                <RadioGroup 
                  value={answers[currentQuestion.id] || ""}
                  onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <div key={option.id} className="flex items-center">
                      <RadioGroupItem 
                        value={option.value} 
                        id={option.id} 
                        className="text-primary"
                      />
                      <Label 
                        htmlFor={option.id} 
                        className="ml-2 text-base cursor-pointer py-2"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              {/* Navigation */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                  disabled={currentStep === 0}
                  className="border-primary text-primary"
                >
                  Back
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id]}
                  className="bg-primary hover:bg-accent text-white"
                >
                  {currentStep === QUIZ_QUESTIONS.length - 1 ? 'See Results' : 'Next'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <img 
                  src={result.image} 
                  alt={result.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="inline-flex items-center bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm font-medium mb-3">
                  <Sparkles className="w-4 h-4 mr-1" />
                  {result.type}
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{result.title}</h3>
                <p className="text-gray-700 mb-5">{result.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Recommended Products:</h4>
                  <ul className="space-y-2">
                    {result.recommendedProducts.map((product, index) => (
                      <li key={index} className="flex items-center">
                        <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">✓</span>
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="bg-primary hover:bg-accent text-white"
                    onClick={() => window.location.href = '/products'}
                  >
                    Shop Recommendations
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="border-primary text-primary"
                    onClick={resetQuiz}
                  >
                    Retake Quiz
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkinQuiz; 