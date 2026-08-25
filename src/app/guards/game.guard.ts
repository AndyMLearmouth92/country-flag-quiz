import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Quiz } from "../services/quiz/quiz";

export const gameGuard: CanActivateFn = () => {
    const quizService = inject(Quiz);
    const router = inject(Router);
  
    return quizService.quizStarted()
      ? true
      : router.createUrlTree(['/']);
  };