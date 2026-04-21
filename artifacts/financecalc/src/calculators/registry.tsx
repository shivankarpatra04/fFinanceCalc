import type { ComponentType } from "react";
import { EMICalculator, HomeLoanCalculator, PersonalLoanCalculator, CarLoanCalculator, LoanEligibilityCalculator } from "./loan";
import { SIPCalculator, FDCalculator, RDCalculator, CAGRCalculator, MutualFundCalculator } from "./investment";
import { GSTCalculator, IncomeTaxCalculator, HRACalculator, TDSCalculator } from "./tax";
import { InHandSalaryCalculator, SalaryHikeCalculator, PFCalculator } from "./salary";
import { StampDutyCalculator, ROICalculator, RentVsBuyCalculator } from "./property";

export const calculatorRegistry: Record<string, ComponentType> = {
  "emi-calculator": EMICalculator,
  "home-loan-calculator": HomeLoanCalculator,
  "personal-loan-calculator": PersonalLoanCalculator,
  "car-loan-calculator": CarLoanCalculator,
  "loan-eligibility-calculator": LoanEligibilityCalculator,
  "sip-calculator": SIPCalculator,
  "fd-calculator": FDCalculator,
  "rd-calculator": RDCalculator,
  "cagr-calculator": CAGRCalculator,
  "mutual-fund-calculator": MutualFundCalculator,
  "gst-calculator": GSTCalculator,
  "income-tax-calculator-india": IncomeTaxCalculator,
  "hra-calculator": HRACalculator,
  "tds-calculator": TDSCalculator,
  "in-hand-salary-calculator": InHandSalaryCalculator,
  "salary-hike-calculator": SalaryHikeCalculator,
  "pf-calculator": PFCalculator,
  "stamp-duty-calculator": StampDutyCalculator,
  "roi-calculator": ROICalculator,
  "rent-vs-buy-calculator": RentVsBuyCalculator,
};
