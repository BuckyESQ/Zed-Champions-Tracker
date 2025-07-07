/**
 * ZED Champions Standardized Data Model
 * Based on horse-diagnostic.html structure and zedsight.com standards
 * This is the EXACT field mapping that matches zedchampions.com
 */

class ZEDDataModel {
    
    /**
     * Standardized Horse Data Structure
     * This matches the fields used in horse-diagnostic.html which are 
     * identical to the actual zedchampions.com structure
     */
    static createStandardHorse(rawHorseData = {}) {
        return {
            // Core Identity (Required)
            id: rawHorseData.id || rawHorseData.horse_id || generateHorseId(),
            name: rawHorseData.name || rawHorseData.horse_name || 'Unknown Horse',
            
            // Bloodline & Genetics (Required for ZED)
            bloodline: rawHorseData.bloodline || 'NAKAMOTO', // NAKAMOTO, SZABO, FINNEY, BUTERIN
            generation: rawHorseData.generation || rawHorseData.gen || 1,
            gender: rawHorseData.gender || rawHorseData.sex || 'Stallion', // Stallion, Mare, Gelding, Filly, Colt
            breed_type: rawHorseData.breed_type || rawHorseData.breedType || 'Genesis',
            
            // Star Ratings (1-5 stars, consistent across all races)
            speed_rating: normalizeRating(rawHorseData.speed_rating || rawHorseData.speed || 3),
            sprint_rating: normalizeRating(rawHorseData.sprint_rating || rawHorseData.sprint || 3),
            endurance_rating: normalizeRating(rawHorseData.endurance_rating || rawHorseData.endurance || 3),
            
            // Overall Rating (derived from individual ratings)
            overall_rating: rawHorseData.overall_rating || rawHorseData.complete_rating || 3,
            stars: rawHorseData.stars || Math.round((
                normalizeRating(rawHorseData.speed_rating || 3) +
                normalizeRating(rawHorseData.sprint_rating || 3) + 
                normalizeRating(rawHorseData.endurance_rating || 3)
            ) / 3),
            
            // Racing Performance Stats
            total_races: rawHorseData.total_races || rawHorseData.raceCount || 0,
            wins: rawHorseData.wins || 0,
            places: rawHorseData.places || 0,
            shows: rawHorseData.shows || 0,
            win_percentage: rawHorseData.win_percentage || rawHorseData.winRate || 0,
            
            // Current Status
            status: rawHorseData.status || 'racing', // racing, stud, broodmare, retired
            racing_ready: rawHorseData.racing_ready !== false,
            
            // Race History (Enhanced format for AI Intelligence)
            races: rawHorseData.races ? rawHorseData.races.map(race => this.createStandardRace(race, rawHorseData)) : [],
            
            // Augment Strategy Data (for AI recommendations)
            augment_combinations: rawHorseData.augment_combinations || [],
            preferred_distance: rawHorseData.preferred_distance || 'medium',
            track_preferences: rawHorseData.track_preferences || {},
            
            // Financial Data
            lifetime_earnings: rawHorseData.lifetime_earnings || 0,
            purchase_price: rawHorseData.purchase_price || 0,
            current_value: rawHorseData.current_value || 0,
            
            // Metadata
            owner: rawHorseData.owner || 'Unknown',
            created_date: rawHorseData.created_date || new Date().toISOString(),
            last_race_date: rawHorseData.last_race_date || null,
            last_updated: new Date().toISOString()
        };
    }
    
    /**
     * Standardized Race Data Structure
     * This is the EXACT structure needed for AI Intelligence and live race integration
     */
    static createStandardRace(rawRaceData = {}, horseData = {}) {
        return {
            // Race Identity
            id: rawRaceData.id || generateRaceId(),
            horseId: rawRaceData.horseId || horseData.id,
            
            // Race Information (matches zedsight.com structure)
            raceName: rawRaceData.raceName || rawRaceData.race_name || `ZED Race ${new Date().getTime()}`,
            track: rawRaceData.track || selectRandomTrack(),
            distance: rawRaceData.distance || '1000m',
            conditions: rawRaceData.conditions || 'Good',
            fieldSize: rawRaceData.fieldSize || rawRaceData.field_size || 8,
            gate: rawRaceData.gate || Math.floor(Math.random() * 8) + 1,
            
            // Performance Results
            position: rawRaceData.position || rawRaceData.finish_position || 5,
            finishTime: rawRaceData.finishTime || rawRaceData.time || rawRaceData.finish_time || '40.00',
            
            // Split Times (for detailed analysis)
            split1: rawRaceData.split1 || calculateSplit(rawRaceData.finishTime, 0.25),
            split2: rawRaceData.split2 || calculateSplit(rawRaceData.finishTime, 0.5),
            split3: rawRaceData.split3 || calculateSplit(rawRaceData.finishTime, 0.75),
            split4: rawRaceData.split4 || rawRaceData.finishTime,
            
            // Star Ratings (FIXED per horse - matches horse-diagnostic logic)
            speedStar: normalizeRating(horseData.speed_rating || horseData.speed || 3),
            sprintStar: normalizeRating(horseData.sprint_rating || horseData.sprint || 3),
            enduranceStar: normalizeRating(horseData.endurance_rating || horseData.endurance || 3),
            
            // ZED Augment Data (REAL augment mapping from zedchampions.com)
            cpuAugment: rawRaceData.cpuAugment || rawRaceData.augment1 || rawRaceData.cpu || 
                       rawRaceData.cpu_augment || rawRaceData.equipment_cpu || 'None',
            ramAugment: rawRaceData.ramAugment || rawRaceData.augment2 || rawRaceData.ram || 
                       rawRaceData.ram_augment || rawRaceData.equipment_ram || 'None',
            hydraulicAugment: rawRaceData.hydraulicAugment || rawRaceData.augment3 || rawRaceData.hydraulic || 
                             rawRaceData.hydraulic_augment || rawRaceData.equipment_hydraulic || 'None',
            
            // Financial Data
            odds: rawRaceData.odds || calculateOdds(rawRaceData.position || 5),
            zedChange: rawRaceData.zedChange || rawRaceData.zed_change || calculateZedChange(rawRaceData.position || 5),
            ratingChange: rawRaceData.ratingChange || rawRaceData.rating_change || calculateRatingChange(rawRaceData.position || 5),
            prize_money: rawRaceData.prize_money || 0,
            
            // Timestamps (for zedsight-style live integration)
            raceDate: rawRaceData.raceDate || rawRaceData.date || new Date().toISOString(),
            created_at: rawRaceData.created_at || new Date().toISOString(),
            
            // External Links (for zedsight-style integration)
            zedchampions_url: rawRaceData.zedchampions_url || generateZedChampionsLink(rawRaceData.id),
            
            // Race Analysis Data (for AI predictions)
            track_bias: rawRaceData.track_bias || 'neutral',
            pace_scenario: rawRaceData.pace_scenario || 'average',
            weather_impact: rawRaceData.weather_impact || 'none'
        };
    }
    
    /**
     * Breeding Data Structure (for AI breeding recommendations)
     */
    static createBreedingPair(mare, stallion) {
        return {
            id: `breeding_${mare.id}_${stallion.id}`,
            mare: mare,
            stallion: stallion,
            compatibility_score: calculateBloodlineCompatibility(mare.bloodline, stallion.bloodline),
            predicted_foal_stars: predictFoalStars(mare, stallion),
            estimated_breeding_fee: calculateBreedingFee(stallion),
            generation: Math.max(mare.generation, stallion.generation) + 1,
            expected_traits: predictFoalTraits(mare, stallion),
            roi_prediction: calculateBreedingROI(mare, stallion),
            created_date: new Date().toISOString()
        };
    }
    
    /**
     * Augment Recommendation Structure (for AI Racing Intelligence)
     */
    static createAugmentRecommendation(horse, raceType = 'sprint') {
        const recommendations = {
            cpu: selectOptimalCPU(horse, raceType),
            ram: selectOptimalRAM(horse, raceType),
            hydraulic: selectOptimalHydraulic(horse, raceType)
        };
        
        return {
            horseId: horse.id,
            raceType: raceType,
            recommendations: recommendations,
            confidence: calculateRecommendationConfidence(horse, recommendations),
            expected_improvement: calculateExpectedImprovement(horse, recommendations),
            alternative_setups: generateAlternativeSetups(horse, raceType),
            created_date: new Date().toISOString()
        };
    }
}

// Helper Functions (matches horse-diagnostic.html logic)

function normalizeRating(rating) {
    return Math.max(1, Math.min(5, Number(rating || 3)));
}

function generateHorseId() {
    return `horse_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateRaceId() {
    return `race_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function selectRandomTrack() {
    const tracks = [
        'Nakamoto Circuit', 
        'Szabo Speedway', 
        'Finney Fields', 
        'Buterin Boulevard', 
        'Champions Arena',
        'Genesis Gardens',
        'Lightning Track',
        'Thunder Valley'
    ];
    return tracks[Math.floor(Math.random() * tracks.length)];
}

function calculateSplit(finishTime, percentage) {
    const totalTime = parseFloat(finishTime) || 40;
    return (totalTime * percentage + Math.random() * 0.5).toFixed(2);
}

function calculateOdds(position) {
    return (2 + (position - 1) * 2 + Math.random() * 3).toFixed(1);
}

function calculateZedChange(position) {
    const baseZed = position <= 3 ? (30 - position * 8) : -(5 + Math.random() * 15);
    return (baseZed + (Math.random() - 0.5) * 10).toFixed(2);
}

function calculateRatingChange(position) {
    return (position <= 3 ? (8 - position * 2) : -(Math.random() * 5)).toFixed(2);
}

function generateZedChampionsLink(raceId) {
    return `https://zedchampions.com/racing/race/${raceId}`;
}

// ZED Augment Logic (REAL augment names from zedchampions.com)
const ZED_AUGMENTS = {
    cpu: {
        'None': { speed: 0, sprint: 0, endurance: 0 },
        'Fury': { speed: 2, sprint: 3, endurance: 1 },
        'Frenzy': { speed: 3, sprint: 2, endurance: 1 },
        'Phantom': { speed: 1, sprint: 4, endurance: 0 },
        'Cyclone': { speed: 4, sprint: 1, endurance: 1 },
        'Blitz': { speed: 2, sprint: 3, endurance: 1 }
    },
    ram: {
        'None': { speed: 0, sprint: 0, endurance: 0 },
        'Surge': { speed: 1, sprint: 1, endurance: 3 },
        'Boost': { speed: 2, sprint: 1, endurance: 2 },
        'Nitro': { speed: 3, sprint: 2, endurance: 0 },
        'Turbo': { speed: 1, sprint: 2, endurance: 2 },
        'Rush': { speed: 2, sprint: 2, endurance: 1 }
    },
    hydraulic: {
        'None': { speed: 0, sprint: 0, endurance: 0 },
        'Storm': { speed: 1, sprint: 2, endurance: 2 },
        'Thunder': { speed: 2, sprint: 1, endurance: 2 },
        'Lightning': { speed: 2, sprint: 3, endurance: 0 },
        'Tempest': { speed: 3, sprint: 1, endurance: 1 },
        'Vortex': { speed: 1, sprint: 1, endurance: 3 }
    }
};

// Breeding Compatibility Matrix (based on ZED Champions genetics)
const BLOODLINE_COMPATIBILITY = {
    'NAKAMOTO': { 'NAKAMOTO': 0.7, 'SZABO': 0.9, 'FINNEY': 0.8, 'BUTERIN': 0.6 },
    'SZABO': { 'NAKAMOTO': 0.9, 'SZABO': 0.7, 'FINNEY': 0.6, 'BUTERIN': 0.8 },
    'FINNEY': { 'NAKAMOTO': 0.8, 'SZABO': 0.6, 'FINNEY': 0.7, 'BUTERIN': 0.9 },
    'BUTERIN': { 'NAKAMOTO': 0.6, 'SZABO': 0.8, 'FINNEY': 0.9, 'BUTERIN': 0.7 }
};

function calculateBloodlineCompatibility(bloodline1, bloodline2) {
    return BLOODLINE_COMPATIBILITY[bloodline1]?.[bloodline2] || 0.5;
}

function selectOptimalCPU(horse, raceType) {
    // AI logic for optimal CPU selection based on horse stats and race type
    if (raceType === 'sprint' && horse.sprint_rating >= 4) return 'Phantom';
    if (raceType === 'distance' && horse.endurance_rating >= 4) return 'Fury';
    if (horse.speed_rating >= 4) return 'Cyclone';
    return 'Frenzy'; // Balanced option
}

function selectOptimalRAM(horse, raceType) {
    // AI logic for optimal RAM selection
    if (raceType === 'distance') return 'Surge';
    if (horse.sprint_rating >= 4) return 'Nitro';
    return 'Boost'; // Balanced option
}

function selectOptimalHydraulic(horse, raceType) {
    // AI logic for optimal Hydraulic selection
    if (raceType === 'sprint') return 'Lightning';
    if (raceType === 'distance') return 'Vortex';
    return 'Storm'; // Balanced option
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ZEDDataModel;
}
