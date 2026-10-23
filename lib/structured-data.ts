// Structured data (JSON-LD) for search engines and AI assistants.
// FAQ answers mirror the visible FAQ on the home page; keep them in sync when copy changes.
export const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "InsuranceAgency",
      "@id": "https://oklahomasecurityguardbond.com/#agency",
      "name": "Oklahoma Security Guard Bond",
      "url": "https://oklahomasecurityguardbond.com",
      "logo": "https://oklahomasecurityguardbond.com/images/osgb-icon.png",
      "email": "service@oklahomasecurityguardbond.com",
      "telephone": "+1-512-806-0045",
      "description": "Surety bonds for Oklahoma CLEET security guard and private investigator licenses: the $5,000 bond for unarmed security guards and unarmed private investigators, and the $10,000 bond for armed security guards and armed private investigators. Each bond is $100 for a 1-year term, $175 for 2 years, or $250 for 3 years, underwritten by American Surety Company (A-rated) and emailed within minutes. The site also walks applicants through CLEET training hours, exams, the IdentoGO fingerprint rule (service code 2B7Q6Z, within 30 days of applying), and the CLEET portal application.",
      "areaServed": {
        "@type": "State",
        "name": "Oklahoma"
      },
      "parentOrganization": {
        "@type": "Organization",
        "name": "Stockton-Hill Insurance LLC"
      },
      "makesOffer": [
        {
          "@type": "Offer",
          "price": "100",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://oklahomasecurityguardbond.com/#pricing",
          "itemOffered": {
            "@type": "Service",
            "name": "Oklahoma Unarmed Security Guard Bond",
            "description": "$5,000 surety bond required for an Oklahoma CLEET unarmed security guard license; 1-year $100, 2-year $175, 3-year $250",
            "provider": {
              "@id": "https://oklahomasecurityguardbond.com/#agency"
            },
            "areaServed": {
              "@type": "State",
              "name": "Oklahoma"
            }
          }
        },
        {
          "@type": "Offer",
          "price": "100",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://oklahomasecurityguardbond.com/#pricing",
          "itemOffered": {
            "@type": "Service",
            "name": "Oklahoma Armed Security Guard Bond",
            "description": "$10,000 surety bond required for an Oklahoma CLEET armed security guard license; 1-year $100, 2-year $175, 3-year $250",
            "provider": {
              "@id": "https://oklahomasecurityguardbond.com/#agency"
            },
            "areaServed": {
              "@type": "State",
              "name": "Oklahoma"
            }
          }
        },
        {
          "@type": "Offer",
          "price": "100",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://oklahomasecurityguardbond.com/#pricing",
          "itemOffered": {
            "@type": "Service",
            "name": "Oklahoma Unarmed Private Investigator Bond",
            "description": "$5,000 surety bond required for an Oklahoma CLEET unarmed private investigator license; 1-year $100, 2-year $175, 3-year $250",
            "provider": {
              "@id": "https://oklahomasecurityguardbond.com/#agency"
            },
            "areaServed": {
              "@type": "State",
              "name": "Oklahoma"
            }
          }
        },
        {
          "@type": "Offer",
          "price": "100",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://oklahomasecurityguardbond.com/#pricing",
          "itemOffered": {
            "@type": "Service",
            "name": "Oklahoma Armed Private Investigator Bond",
            "description": "$10,000 surety bond required for an Oklahoma CLEET armed private investigator license; 1-year $100, 2-year $175, 3-year $250",
            "provider": {
              "@id": "https://oklahomasecurityguardbond.com/#agency"
            },
            "areaServed": {
              "@type": "State",
              "name": "Oklahoma"
            }
          }
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://oklahomasecurityguardbond.com/#website",
      "url": "https://oklahomasecurityguardbond.com",
      "name": "Oklahoma Security Guard Bond",
      "publisher": {
        "@id": "https://oklahomasecurityguardbond.com/#agency"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://oklahomasecurityguardbond.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What goes in with my CLEET application?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A certified court judgment and sentence, or a letter of no record, for each arrest or charge; a current passport-size color photo; a letter of employment or your bond; documented proof of experience or comparable training; your IdentoGO fingerprints; and the license fee. Non-U.S. citizens add verifiable documentation of legal residence. Armed private investigators add a current MMPI."
          }
        },
        {
          "@type": "Question",
          "name": "Does the bond replace a letter of employment?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CLEET's checklist reads “Letter of Employment or Bond/Insurance,” so independent applicants and self-employed investigators use the bond where an employee would use a letter. If your situation is unusual, confirm it with CLEET before you apply."
          }
        },
        {
          "@type": "Question",
          "name": "Do you file anything with CLEET for me?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. You submit your own application through the CLEET portal. What we do: issue your bond, email your documents within minutes, and lay out every step so nothing gets missed."
          }
        },
        {
          "@type": "Question",
          "name": "How much is an Oklahoma security guard bond?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "$100 for one year, $175 for two, or $250 for three, for the $5,000 unarmed guard bond or the $10,000 armed guard bond. The CLEET license fee is separate: $50 unarmed, $100 armed."
          }
        },
        {
          "@type": "Question",
          "name": "How much is an Oklahoma private investigator bond?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The same $100 / $175 / $250 by term. Unarmed investigators need a $5,000 bond and pay CLEET $50 for the license; armed investigators need a $10,000 bond, pay CLEET $100, and also need a current MMPI."
          }
        },
        {
          "@type": "Question",
          "name": "What does the bond do? Is it insurance for me?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The bond protects the public and the state: if a licensee causes a loss through misconduct, the surety pays the claim and then collects it back from the licensee. It's a licensing requirement, not liability coverage. If you want coverage that protects you or your company, that's a separate policy, and a licensed agent can review it with you."
          }
        },
        {
          "@type": "Question",
          "name": "Which term should I pick?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "That depends on how long you plan to hold the license, and the choice is yours. The 3-year bond works out to about $83 a year and means two fewer renewals to track; the 1-year bond is the lowest cost up front. We publish the prices, we don't pick the term for you."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need a separate bond for the armed guard and armed PI combination?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The combination license has its own CLEET fee ($150), training (115 hours), and exams. Whether it carries one bond or two depends on how CLEET processes your application. Ask Marshal in the chat and a real person will confirm for your situation."
          }
        },
        {
          "@type": "Question",
          "name": "How do training waivers work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CLEET may waive some training for documented experience, including prior law enforcement or military service. Armed waivers still require the 2-hour legal block course unless you're a CLEET-certified peace officer. Whether your experience qualifies is CLEET's decision."
          }
        },
        {
          "@type": "Question",
          "name": "What is service code 2B7Q6Z?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It's the IdentoGO service code for CLEET security guard and private investigator applicants. Use it when you book your fingerprint appointment so the prints route to CLEET. Prints must be taken within 30 days of submitting your application."
          }
        },
        {
          "@type": "Question",
          "name": "Will an arrest or an old charge disqualify me?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "That's CLEET's call, not ours, and we can't advise on it. What we can tell you: the application requires a certified court judgment and sentence, or a letter of no record, for every arrest or charge, and a felony or crime of moral turpitude conviction is disqualifying. Contact CLEET directly before you spend money on training if you have a question about your record."
          }
        },
        {
          "@type": "Question",
          "name": "How much continuing education do I need?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Security guards complete at least 8 hours from an approved source during each license period; private investigators complete at least 16. The combination license follows the 16-hour investigator requirement."
          }
        },
        {
          "@type": "Question",
          "name": "Am I eligible for an Oklahoma security guard or PI license?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You must be at least 18, a U.S. citizen or an alien legally residing in the country, of good moral character, and have no conviction for a felony or a crime of moral turpitude."
          }
        },
        {
          "@type": "Question",
          "name": "What if I have questions during the process?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Click the chat in the bottom right corner anytime. Our AI assistant, Marshal, handles questions about the four licenses, the bond, fingerprints, and the CLEET application 24/7. For complex situations, a real person follows up the next business day."
          }
        }
      ]
    }
  ]
} as const;
