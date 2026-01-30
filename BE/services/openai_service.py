import os
import logging
from openai import OpenAI
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

class OpenAIService:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY not found in environment variables")
        
        self.client = OpenAI(api_key=api_key)
        self.model = os.getenv("OPENAI_MODEL", "gpt-4o")
    
    def generate_options(
        self,
        step1_data: Dict[str, Any],
        step2_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Generate career/decision options based on Steps 1-2 data using LLM
        
        Args:
            step1_data: Communication data (external/internal cues)
            step2_data: Analysis data (self-knowledge, occupational knowledge, metacognition)
        
        Returns:
            Dict containing generated options with titles, descriptions, and profiles
        """
        
        # Build structured prompt
        prompt = self._build_prompt(step1_data, step2_data)
        
        # Build system prompt
        system_prompt = self._build_system_prompt()
        
        try:
            logger.info(f"Sending request to OpenAI ({self.model})")
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": system_prompt
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            content = response.choices[0].message.content
            tokens_used = {
                "prompt_tokens": response.usage.prompt_tokens,
                "completion_tokens": response.usage.completion_tokens,
                "total_tokens": response.usage.total_tokens
            }
            
            logger.info(f"OpenAI response received. Tokens used: {tokens_used['total_tokens']}")
            
            return {
                "success": True,
                "content": content,
                "tokens_used": tokens_used,
                "model": self.model
            }
            
        except Exception as e:
            logger.error(f"OpenAI API error: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
    
    def _build_prompt(
        self,
        step1_data: Dict[str, Any],
        step2_data: Dict[str, Any]
    ) -> str:
        """Build structured prompt from Step 2 self-knowledge data only"""
        
        prompt_parts = ["# User Self-Knowledge Information\n"]
        
        # Only use Step 2: Self-Knowledge
        self_knowledge = step2_data.get('selfKnowledge', {})
        
        values = self_knowledge.get('values', '')
        interests = self_knowledge.get('interests', '')
        skills = self_knowledge.get('skills', '')
        occ_interests = self_knowledge.get('occupationalInterests', '')
        
        if values:
            prompt_parts.append(f"**Values**: {values}")
        if interests:
            prompt_parts.append(f"**Interests**: {interests}")
        if skills:
            prompt_parts.append(f"**Skills/Strengths**: {skills}")
        if occ_interests:
            prompt_parts.append(f"**Occupational/Work Interests**: {occ_interests}")
        
        prompt_parts.append("\n---")
        prompt_parts.append("Based on the above self-knowledge information, generate 5-8 career/decision alternatives that are suitable for this user.")
        prompt_parts.append("Each alternative should be specific, actionable, and aligned with the user's values, interests, skills, and occupational interests.")
        
        return "\n".join(prompt_parts)
    
    def _build_system_prompt(self) -> str:
        """Build system prompt for option generation"""
        
        system_prompt = """You are a career counseling expert specializing in the CASVE (Communication, Analysis, Synthesis, Valuing, Execution) decision-making model.
Your task is to generate personalized career or decision alternatives based on the user's self-knowledge information (values, interests, skills, and occupational interests).

Generate 5-8 realistic and actionable alternatives that meet the following criteria:
1. Aligned with the user's values, interests, and skills
2. Match the user's occupational/work interests
3. Specific and practically executable
4. Provide concrete and useful information

Respond ONLY in the following JSON format:
{
  "options": [
    {
      "title": "Alternative title (concise and clear)",
      "description": "2-3 sentence overview of the alternative",
      "profile": {
        "핵심역할": "Core responsibilities and role description",
        "필요역량": "Required competencies and skills",
        "진입경로": "Entry methods and procedures",
        "근무환경": "Work environment and organizational culture",
        "성장가능성": "Growth potential and development opportunities",
        "보상수준": "Expected salary level and benefits",
        "위험요소": "Risk factors and disadvantages to consider"
      },
      "matchReason": "Specific reason why this alternative suits the user (2-3 sentences)"
    }
  ]
}

IMPORTANT: 
- Respond ONLY with valid JSON, no additional text
- ALL content (title, description, profile fields, matchReason) MUST be written in KOREAN (한글)
- Each profile field should provide specific and useful information"""
        
        return system_prompt
