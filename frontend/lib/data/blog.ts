export interface BlogPost {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  content: string;
  contentHindi: string;
  image: string;
  backgroundColor: string;
  category: 'liver-health' | 'ayurveda' | 'wellness' | 'natural-remedies';
  publishedAt: string;
  readTime: string;
  author: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'liver-health-12-ways',
    title: '12 Effective and Easy Ways to Keep the Liver Healthy and Strong',
    titleHindi: 'लिवर को स्वस्थ और मजबूत रखने के 12 असरदार और आसान तरीके',
    description: 'The liver is a superhero of our body, which cleans the blood, converts food into energy, and removes toxic substances. But wrong diet, stress...',
    descriptionHindi: 'लिवर हमारे शरीर का एक सुपरहीरो है, जो खून को साफ करता है, खाने को ऊर्जा में बदलता है और विषैले पदार्थों को बाहर निकालता है। लेकिन गलत खान-पान, तनाव...',
    content: `# 12 Effective and Easy Ways to Keep the Liver Healthy and Strong

The liver is one of the most vital organs in our body, responsible for detoxification, metabolism, and energy production. Here are 12 proven ways to maintain liver health:

## 1. Stay Hydrated
Drink plenty of water throughout the day. Aim for 8-10 glasses daily to help flush toxins.

## 2. Eat Liver-Friendly Foods
- Leafy greens (spinach, kale)
- Cruciferous vegetables (broccoli, cauliflower)
- Berries and citrus fruits
- Nuts and seeds

## 3. Limit Alcohol Consumption
Excessive alcohol can damage liver cells. Moderation is key.

## 4. Exercise Regularly
Physical activity helps maintain a healthy weight and improves liver function.

## 5. Get Adequate Sleep
7-9 hours of quality sleep allows the liver to repair and regenerate.

## 6. Avoid Processed Foods
Limit intake of refined sugars, trans fats, and artificial additives.

## 7. Use Natural Herbs
- Turmeric (curcumin)
- Milk thistle
- Dandelion root
- Ginger

## 8. Manage Stress
Practice meditation, yoga, or deep breathing exercises.

## 9. Regular Health Checkups
Monitor liver function through regular blood tests.

## 10. Maintain Healthy Weight
Obesity can lead to fatty liver disease.

## 11. Quit Smoking
Smoking damages liver cells and impairs function.

## 12. Eat at Regular Intervals
Avoid skipping meals and maintain consistent eating patterns.

Remember, a healthy liver means a healthier you!`,
    contentHindi: `# लिवर को स्वस्थ और मजबूत रखने के 12 असरदार और आसान तरीके

लिवर हमारे शरीर का एक महत्वपूर्ण अंग है, जो डिटॉक्सिफिकेशन, मेटाबॉलिज्म और ऊर्जा उत्पादन के लिए जिम्मेदार है। यहाँ लिवर स्वास्थ्य बनाए रखने के 12 सिद्ध तरीके हैं:

## 1. हाइड्रेटेड रहें
दिन भर में खूब पानी पीएं। दिन में 8-10 गिलास पानी का लक्ष्य रखें।

## 2. लिवर-फ्रेंडली खाद्य पदार्थ खाएं
- पत्तेदार सब्जियां (पालक, केल)
- क्रूसिफेरस सब्जियां (ब्रोकोली, फूलगोभी)
- जामुन और खट्टे फल
- नट्स और बीज

## 3. शराब की खपत को सीमित करें
अत्यधिक शराब लिवर कोशिकाओं को नुकसान पहुंचा सकती है।

## 4. नियमित व्यायाम करें
शारीरिक गतिविधि स्वस्थ वजन बनाए रखने में मदद करती है।

## 5. पर्याप्त नींद लें
7-9 घंटे की गुणवत्तापूर्ण नींद लिवर को मरम्मत करने की अनुमति देती है।

## 6. प्रोसेस्ड फूड से बचें
रिफाइंड शुगर, ट्रांस फैट और कृत्रिम योजकों का सेवन सीमित करें।

## 7. प्राकृतिक जड़ी-बूटियों का उपयोग करें
- हल्दी (करक्यूमिन)
- मिल्क थिस्ल
- डंडेलियन रूट
- अदरक

## 8. तनाव का प्रबंधन करें
ध्यान, योग या गहरी सांस लेने के व्यायाम करें।

## 9. नियमित स्वास्थ्य जांच
नियमित रक्त परीक्षणों के माध्यम से लिवर फंक्शन की निगरानी करें।

## 10. स्वस्थ वजन बनाए रखें
मोटापा फैटी लिवर रोग का कारण बन सकता है।

## 11. धूम्रपान छोड़ें
धूम्रपान लिवर कोशिकाओं को नुकसान पहुंचाता है।

## 12. नियमित अंतराल पर खाएं
भोजन छोड़ने से बचें और नियमित खाने के पैटर्न बनाए रखें।

याद रखें, स्वस्थ लिवर का मतलब स्वस्थ आप!`,
    image: '/assets/images/blogs/b1.png',
    backgroundColor: '#f5f5dc',
    category: 'liver-health',
    publishedAt: '2024-01-15',
    readTime: '5 min read',
    author: 'Dr. Ayurveda Expert',
    tags: ['liver-health', 'detox', 'natural-remedies', 'wellness']
  },
  {
    id: 'liver-cleansing-10-ways',
    title: '10 Easy and Natural Ways to Cleanse the Liver',
    titleHindi: 'लिवर को साफ करने के 10 आसान और प्राकृतिक तरीके',
    description: 'The liver is a superpower of your body, which cleans the blood, converts food into energy, and removes harmful things. But wrong diet, stress...',
    descriptionHindi: 'लिवर आपके शरीर का एक सुपरपावर है, जो खून को साफ करता है, खाने को ऊर्जा में बदलता है और हानिकारक चीजों को बाहर निकालता है। लेकिन गलत खान-पान, तनाव...',
    content: `# 10 Easy and Natural Ways to Cleanse the Liver

Your liver works tirelessly to keep your body healthy. Here are 10 natural ways to support and cleanse this vital organ:

## 1. Lemon Water
Start your day with warm lemon water to stimulate liver enzymes.

## 2. Green Tea
Rich in antioxidants, green tea supports liver function and detoxification.

## 3. Turmeric
The active compound curcumin has powerful anti-inflammatory properties.

## 4. Garlic
Contains sulfur compounds that activate liver enzymes.

## 5. Beetroot
High in betaine, which helps protect liver cells.

## 6. Leafy Greens
Spinach, kale, and other greens are rich in chlorophyll.

## 7. Avocados
Contain glutathione, a powerful antioxidant for liver health.

## 8. Walnuts
Rich in omega-3 fatty acids and amino acids.

## 9. Olive Oil
Extra virgin olive oil supports healthy liver function.

## 10. Regular Fasting
Intermittent fasting gives your liver time to repair and regenerate.

## Additional Tips:
- Stay hydrated throughout the day
- Exercise regularly
- Get adequate sleep
- Reduce stress through meditation

Your liver will thank you for these natural cleansing methods!`,
    contentHindi: `# लिवर को साफ करने के 10 आसान और प्राकृतिक तरीके

आपका लिवर आपके शरीर को स्वस्थ रखने के लिए निरंतर काम करता है। यहाँ इस महत्वपूर्ण अंग का समर्थन और सफाई करने के 10 प्राकृतिक तरीके हैं:

## 1. नींबू पानी
लिवर एंजाइमों को उत्तेजित करने के लिए गर्म नींबू पानी के साथ अपना दिन शुरू करें।

## 2. ग्रीन टी
एंटीऑक्सिडेंट से भरपूर, ग्रीन टी लिवर फंक्शन और डिटॉक्सिफिकेशन का समर्थन करती है।

## 3. हल्दी
सक्रिय यौगिक करक्यूमिन में शक्तिशाली एंटी-इंफ्लेमेटरी गुण होते हैं।

## 4. लहसुन
सल्फर यौगिकों को शामिल करता है जो लिवर एंजाइमों को सक्रिय करते हैं।

## 5. चुकंदर
बीटाइन में उच्च, जो लिवर कोशिकाओं की रक्षा करने में मदद करता है।

## 6. पत्तेदार सब्जियां
पालक, केल और अन्य हरी सब्जियां क्लोरोफिल में समृद्ध हैं।

## 7. एवोकाडो
ग्लूटाथियोन शामिल करता है, लिवर स्वास्थ्य के लिए एक शक्तिशाली एंटीऑक्सिडेंट।

## 8. अखरोट
ओमेगा-3 फैटी एसिड और अमीनो एसिड में समृद्ध।

## 9. जैतून का तेल
एक्स्ट्रा वर्जिन जैतून का तेल स्वस्थ लिवर फंक्शन का समर्थन करता है।

## 10. नियमित उपवास
इंटरमिटेंट फास्टिंग आपके लिवर को मरम्मत और पुनर्जनन का समय देती है।

## अतिरिक्त सुझाव:
- दिन भर हाइड्रेटेड रहें
- नियमित व्यायाम करें
- पर्याप्त नींद लें
- ध्यान के माध्यम से तनाव कम करें

आपका लिवर इन प्राकृतिक सफाई विधियों के लिए आपको धन्यवाद देगा!`,
    image: '/assets/images/blogs/b2.png',

    backgroundColor: '#ff6b6b',
    category: 'liver-health',
    publishedAt: '2024-01-20',
    readTime: '4 min read',
    author: 'Dr. Ayurveda Expert',
    tags: ['liver-cleansing', 'detox', 'natural-remedies', 'ayurveda']
  },
  {
    id: 'ayurvedic-daily-routine',
    title: 'Ayurvedic Daily Routine: Dinacharya for Optimal Health',
    titleHindi: 'आयुर्वेदिक दैनिक दिनचर्या: इष्टतम स्वास्थ्य के लिए दिनचर्या',
    description: 'Discover the ancient wisdom of Dinacharya, the Ayurvedic daily routine that aligns your body with natural rhythms for optimal health and wellness.',
    descriptionHindi: 'दिनचर्या की प्राचीन ज्ञान की खोज करें, आयुर्वेदिक दैनिक दिनचर्या जो इष्टतम स्वास्थ्य और कल्याण के लिए प्राकृतिक लय के साथ आपके शरीर को संरेखित करती है।',
    content: `# Ayurvedic Daily Routine: Dinacharya for Optimal Health

Dinacharya, the Ayurvedic daily routine, is designed to align your body with natural rhythms. Here's how to implement it:

## Morning Routine (6:00 AM - 10:00 AM)
- Wake up before sunrise (Brahma Muhurta)
- Drink warm water with lemon
- Practice oil pulling with sesame oil
- Gentle stretching and yoga
- Light breakfast

## Midday Routine (10:00 AM - 2:00 PM)
- Main meal of the day
- Stay active and productive
- Avoid heavy foods

## Afternoon Routine (2:00 PM - 6:00 PM)
- Light snack if needed
- Continue work activities
- Prepare for evening

## Evening Routine (6:00 PM - 10:00 PM)
- Light dinner
- Gentle evening walk
- Relaxation and meditation
- Prepare for sleep

## Benefits of Dinacharya:
- Improved digestion
- Better sleep quality
- Increased energy levels
- Enhanced mental clarity
- Balanced doshas

Start with small changes and gradually build your routine!`,
    contentHindi: `# आयुर्वेदिक दैनिक दिनचर्या: इष्टतम स्वास्थ्य के लिए दिनचर्या

दिनचर्या, आयुर्वेदिक दैनिक दिनचर्या, आपके शरीर को प्राकृतिक लय के साथ संरेखित करने के लिए डिज़ाइन की गई है। यहाँ इसे लागू करने का तरीका है:

## सुबह की दिनचर्या (6:00 बजे - 10:00 बजे)
- सूर्योदय से पहले जागें (ब्रह्म मुहूर्त)
- नींबू के साथ गर्म पानी पीएं
- तिल के तेल के साथ तेल खींचने का अभ्यास करें
- हल्का स्ट्रेचिंग और योग
- हल्का नाश्ता

## दोपहर की दिनचर्या (10:00 बजे - 2:00 बजे)
- दिन का मुख्य भोजन
- सक्रिय और उत्पादक रहें
- भारी खाद्य पदार्थों से बचें

## दोपहर के बाद की दिनचर्या (2:00 बजे - 6:00 बजे)
- आवश्यकता होने पर हल्का स्नैक
- कार्य गतिविधियों को जारी रखें
- शाम की तैयारी करें

## शाम की दिनचर्या (6:00 बजे - 10:00 बजे)
- हल्का रात का खाना
- हल्की शाम की सैर
- विश्राम और ध्यान
- नींद की तैयारी

## दिनचर्या के लाभ:
- बेहतर पाचन
- बेहतर नींद की गुणवत्ता
- बढ़ी हुई ऊर्जा स्तर
- बेहतर मानसिक स्पष्टता
- संतुलित दोष

छोटे बदलावों से शुरू करें और धीरे-धीरे अपनी दिनचर्या बनाएं!`,
    image: '/assets/images/blogs/b1.png',

    backgroundColor: '#e8f5e8',
    category: 'ayurveda',
    publishedAt: '2024-01-25',
    readTime: '6 min read',
    author: 'Dr. Ayurveda Expert',
    tags: ['ayurveda', 'daily-routine', 'wellness', 'lifestyle']
  }
];

export const getBlogPost = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getAllBlogPosts = (): BlogPost[] => {
  return blogPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};
