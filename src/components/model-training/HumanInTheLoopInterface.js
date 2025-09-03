'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Slider,
  Rating,
  Paper,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Alert,
  AlertTitle,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from '@mui/material';
import {
  Person,
  ThumbUp,
  ThumbDown,
  Visibility,
  Edit,
  Comment,
  CheckCircle,
  Error,
  Warning,
  Info,
  Send,
  Assessment,
  Psychology,
  Timeline,
  ExpandMore,
  Close,
  PhotoCamera,
  Assignment,
  TrendingUp,
} from '@mui/icons-material';

const reviewCriteria = {
  computer_vision: [
    { id: 'accuracy', label: 'Object Detection Accuracy', weight: 0.3 },
    { id: 'false_positives', label: 'False Positive Rate', weight: 0.25, invert: true },
    { id: 'edge_cases', label: 'Edge Case Handling', weight: 0.2 },
    { id: 'inference_speed', label: 'Inference Speed', weight: 0.15 },
    { id: 'robustness', label: 'Robustness to Variations', weight: 0.1 },
  ],
  supply_chain: [
    { id: 'forecasting_accuracy', label: 'Forecasting Accuracy', weight: 0.35 },
    { id: 'seasonality', label: 'Seasonal Pattern Recognition', weight: 0.25 },
    { id: 'outlier_handling', label: 'Outlier Detection & Handling', weight: 0.2 },
    { id: 'business_logic', label: 'Business Logic Compliance', weight: 0.15 },
    { id: 'interpretability', label: 'Model Interpretability', weight: 0.05 },
  ]
};

const expertProfiles = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    role: 'Computer Vision Expert',
    specialization: 'Object Detection & Quality Control',
    experience: '8 years',
    avatar: '/api/placeholder/40/40',
    reviews: 147,
    avgRating: 4.8,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Supply Chain Analyst',
    specialization: 'Demand Forecasting & Optimization',
    experience: '12 years',
    avatar: '/api/placeholder/40/40',
    reviews: 203,
    avgRating: 4.9,
  },
  {
    id: 3,
    name: 'Jennifer Wang',
    role: 'ML Operations Engineer',
    specialization: 'Model Deployment & Monitoring',
    experience: '6 years',
    avatar: '/api/placeholder/40/40',
    reviews: 89,
    avgRating: 4.7,
  },
];

export default function HumanInTheLoopInterface({ model, modelType, onFeedbackSubmit }) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [feedback, setFeedback] = useState({
    overallRating: 3,
    criteriaRatings: {},
    comments: '',
    recommendations: [],
    needsRetraining: false,
    reviewStatus: 'pending',
    testCases: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const criteria = reviewCriteria[modelType] || reviewCriteria.computer_vision;

  const handleCriteriaRating = (criteriaId, value) => {
    setFeedback(prev => ({
      ...prev,
      criteriaRatings: {
        ...prev.criteriaRatings,
        [criteriaId]: value
      }
    }));
  };

  const handleRecommendationToggle = (recommendation) => {
    setFeedback(prev => ({
      ...prev,
      recommendations: prev.recommendations.includes(recommendation)
        ? prev.recommendations.filter(r => r !== recommendation)
        : [...prev.recommendations, recommendation]
    }));
  };

  const calculateWeightedScore = () => {
    let totalScore = 0;
    let totalWeight = 0;
    
    criteria.forEach(criterion => {
      const rating = feedback.criteriaRatings[criterion.id];
      if (rating !== undefined) {
        const score = criterion.invert ? (6 - rating) : rating;
        totalScore += score * criterion.weight;
        totalWeight += criterion.weight;
      }
    });
    
    return totalWeight > 0 ? (totalScore / totalWeight) : 0;
  };

  const handleSubmitFeedback = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const finalFeedback = {
      ...feedback,
      expertId: selectedExpert?.id,
      weightedScore: calculateWeightedScore(),
      timestamp: new Date(),
      modelId: model.id || 'current',
    };
    
    onFeedbackSubmit(finalFeedback);
    setIsSubmitting(false);
  };

  const renderExpertSelection = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Expert Reviewer
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Choose a domain expert to review your model performance and provide feedback.
      </Typography>
      
      <Grid container spacing={3}>
        {expertProfiles
          .filter(expert => 
            (modelType === 'computer_vision' && expert.role.includes('Vision')) ||
            (modelType === 'supply_chain' && expert.role.includes('Supply')) ||
            expert.role.includes('ML Operations')
          )
          .map((expert) => (
            <Grid item xs={12} md={6} key={expert.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  border: selectedExpert?.id === expert.id ? 2 : 1,
                  borderColor: selectedExpert?.id === expert.id ? 'primary.main' : 'divider',
                  '&:hover': { boxShadow: 3 }
                }}
                onClick={() => setSelectedExpert(expert)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ width: 56, height: 56, mr: 2 }}
                      src={expert.avatar}
                    >
                      {expert.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{expert.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {expert.role}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" gutterBottom>
                    <strong>Specialization:</strong> {expert.specialization}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Experience:</strong> {expert.experience}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                    <Rating value={expert.avgRating} readOnly size="small" />
                    <Typography variant="caption">
                      {expert.reviews} reviews
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      {selectedExpert && (
        <Alert severity="info" sx={{ mt: 3 }}>
          <AlertTitle>Expert Selected</AlertTitle>
          {selectedExpert.name} will review your {modelType.replace('_', ' ')} model. 
          Expected review time: 2-4 hours.
        </Alert>
      )}
    </Box>
  );

  const renderModelReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Model Performance Review
      </Typography>
      
      {/* Overall Model Performance */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Overall Model Assessment
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography component="legend" gutterBottom>
              Overall Rating (1-5 stars)
            </Typography>
            <Rating
              value={feedback.overallRating}
              onChange={(event, newValue) => {
                setFeedback(prev => ({ ...prev, overallRating: newValue }));
              }}
              size="large"
            />
          </Box>
          
          <FormControlLabel
            control={
              <Checkbox
                checked={feedback.needsRetraining}
                onChange={(e) => setFeedback(prev => ({ 
                  ...prev, 
                  needsRetraining: e.target.checked 
                }))}
              />
            }
            label="Recommend model retraining with improved data/parameters"
          />
        </CardContent>
      </Card>

      {/* Detailed Criteria Assessment */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Detailed Performance Criteria
          </Typography>
          
          {criteria.map((criterion) => (
            <Box key={criterion.id} sx={{ mb: 3 }}>
              <Typography variant="body2" gutterBottom>
                {criterion.label} (Weight: {(criterion.weight * 100).toFixed(0)}%)
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Rating
                  value={feedback.criteriaRatings[criterion.id] || 0}
                  onChange={(event, newValue) => handleCriteriaRating(criterion.id, newValue)}
                />
                <Typography variant="caption" color="text.secondary">
                  {criterion.invert ? 'Lower is better' : 'Higher is better'}
                </Typography>
              </Box>
            </Box>
          ))}
          
          {Object.keys(feedback.criteriaRatings).length > 0 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <AlertTitle>Weighted Score</AlertTitle>
              Overall weighted performance score: {calculateWeightedScore().toFixed(2)}/5.0
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Comments and Recommendations */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Expert Comments & Recommendations
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Detailed Comments"
            placeholder="Provide specific observations about model performance, strengths, weaknesses, and improvement suggestions..."
            value={feedback.comments}
            onChange={(e) => setFeedback(prev => ({ ...prev, comments: e.target.value }))}
            sx={{ mb: 3 }}
          />
          
          <Typography variant="body2" gutterBottom>
            Recommended Actions (select all that apply):
          </Typography>
          <FormGroup>
            {[
              'Collect more training data',
              'Improve data quality/labeling',
              'Adjust hyperparameters',
              'Try different model architecture',
              'Add data augmentation',
              'Implement ensemble methods',
              'Improve feature engineering',
              'Ready for production deployment'
            ].map((recommendation) => (
              <FormControlLabel
                key={recommendation}
                control={
                  <Checkbox
                    checked={feedback.recommendations.includes(recommendation)}
                    onChange={() => handleRecommendationToggle(recommendation)}
                  />
                }
                label={recommendation}
              />
            ))}
          </FormGroup>
        </CardContent>
      </Card>
    </Box>
  );

  const renderTestCases = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Edge Cases & Test Scenarios
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Define specific test cases and edge scenarios for model validation.
      </Typography>
      
      <Card>
        <CardContent>
          <Button 
            variant="outlined" 
            startIcon={<Assignment />} 
            onClick={() => setDialogOpen(true)}
            sx={{ mb: 2 }}
          >
            Add Test Case
          </Button>
          
          {feedback.testCases.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
              No test cases defined yet. Add test cases to validate model performance.
            </Typography>
          ) : (
            <List>
              {feedback.testCases.map((testCase, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Assignment />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={testCase.name}
                    secondary={testCase.description}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );

  const renderReviewSummary = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Summary
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Performance Metrics
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Overall Rating
                </Typography>
                <Rating value={feedback.overallRating} readOnly />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Weighted Score
                </Typography>
                <Typography variant="h6">
                  {calculateWeightedScore().toFixed(2)}/5.0
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Recommendation
                </Typography>
                <Chip 
                  label={feedback.needsRetraining ? 'Needs Retraining' : 'Ready for Next Stage'}
                  color={feedback.needsRetraining ? 'warning' : 'success'}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Expert Feedback
              </Typography>
              {selectedExpert && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                    {selectedExpert.name.charAt(0)}
                  </Avatar>
                  <Typography variant="body2">
                    Reviewed by {selectedExpert.name}
                  </Typography>
                </Box>
              )}
              <Typography variant="body2" color="text.secondary" paragraph>
                {feedback.comments || 'No comments provided yet.'}
              </Typography>
              {feedback.recommendations.length > 0 && (
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Recommendations:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {feedback.recommendations.map((rec, index) => (
                      <Chip key={index} label={rec} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined">
          Save Draft
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmitFeedback}
          disabled={!selectedExpert || isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : <Send />}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>Human Expert Review Required</AlertTitle>
        Your model needs expert validation before proceeding to the tuning phase. 
        This ensures quality and reliability for production deployment.
      </Alert>

      <Paper>
        <Tabs 
          value={activeTab} 
          onChange={(e, v) => setActiveTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Select Expert" icon={<Person />} iconPosition="start" />
          <Tab label="Model Review" icon={<Assessment />} iconPosition="start" />
          <Tab label="Test Cases" icon={<Assignment />} iconPosition="start" />
          <Tab label="Summary" icon={<CheckCircle />} iconPosition="start" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && renderExpertSelection()}
          {activeTab === 1 && renderModelReview()}
          {activeTab === 2 && renderTestCases()}
          {activeTab === 3 && renderReviewSummary()}
        </Box>
      </Paper>

      {/* Test Case Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Add Test Case
          <IconButton
            onClick={() => setDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Test Case Name"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Add Test Case</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 