'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  Rating,
  LinearProgress,
  Alert,
  AlertTitle,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Badge,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Search,
  Person,
  Campaign,
  Analytics,
  Star,
  LocationOn,
  Work,
  School,
  Verified,
  TrendingUp,
  Assignment,
  Group,
  Launch,
  Visibility,
  Edit,
  Add,
  FilterList,
  Timeline,
  CheckCircle,
  Schedule,
  Warning,
  Business,
  AttachMoney,
  Speed,
} from '@mui/icons-material';

// Mock data for experts
const mockExperts = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    title: 'Senior AI Research Scientist',
    company: 'Google DeepMind',
    location: 'San Francisco, CA',
    avatar: '/api/placeholder/100/100',
    confidenceScore: 95,
    rating: 4.9,
    reviewCount: 147,
    hourlyRate: 250,
    availability: 'Available',
    skills: ['Machine Learning', 'Computer Vision', 'PyTorch', 'TensorFlow', 'Research'],
    experience: '8+ years',
    education: 'PhD Computer Science, Stanford',
    completedProjects: 23,
    successRate: 98,
    specializations: ['AI/ML', 'Computer Vision', 'Deep Learning'],
    verified: true,
    languages: ['English', 'Mandarin'],
    timezone: 'PST',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    title: 'Supply Chain Optimization Expert',
    company: 'McKinsey & Company',
    location: 'New York, NY',
    avatar: '/api/placeholder/100/100',
    confidenceScore: 92,
    rating: 4.8,
    reviewCount: 203,
    hourlyRate: 180,
    availability: 'Busy',
    skills: ['Supply Chain', 'Operations Research', 'Data Analytics', 'Python', 'SQL'],
    experience: '12+ years',
    education: 'MBA Operations, Wharton',
    completedProjects: 45,
    successRate: 96,
    specializations: ['Supply Chain', 'Operations', 'Analytics'],
    verified: true,
    languages: ['English', 'Spanish'],
    timezone: 'EST',
  },
  {
    id: 3,
    name: 'Jennifer Wang',
    title: 'Full-Stack Developer & DevOps Engineer',
    company: 'Microsoft',
    location: 'Seattle, WA',
    avatar: '/api/placeholder/100/100',
    confidenceScore: 88,
    rating: 4.7,
    reviewCount: 89,
    hourlyRate: 150,
    availability: 'Available',
    skills: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    experience: '6+ years',
    education: 'BS Computer Science, MIT',
    completedProjects: 31,
    successRate: 94,
    specializations: ['Web Development', 'Cloud Architecture', 'DevOps'],
    verified: true,
    languages: ['English', 'Korean'],
    timezone: 'PST',
  },
  // Add more experts...
];

// Mock data for campaigns
const mockCampaigns = [
  {
    id: 1,
    name: 'AI-Powered Quality Control System',
    tenant: 'TechCorp Inc.',
    status: 'Active',
    progress: 75,
    budget: 50000,
    spent: 37500,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    expertsAssigned: 3,
    category: 'AI/ML',
    priority: 'High',
    description: 'Develop computer vision system for automated quality control in manufacturing.',
  },
  {
    id: 2,
    name: 'Supply Chain Optimization',
    tenant: 'GlobalLogistics Ltd.',
    status: 'Planning',
    progress: 25,
    budget: 75000,
    spent: 18750,
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    expertsAssigned: 2,
    category: 'Operations',
    priority: 'Medium',
    description: 'Optimize supply chain routes and inventory management across 50+ locations.',
  },
  {
    id: 3,
    name: 'Digital Transformation Platform',
    tenant: 'RetailChain Corp.',
    status: 'Completed',
    progress: 100,
    budget: 120000,
    spent: 115000,
    startDate: '2023-10-01',
    endDate: '2024-01-31',
    expertsAssigned: 5,
    category: 'Digital Transformation',
    priority: 'High',
    description: 'Build comprehensive digital platform for omnichannel retail operations.',
  },
];

export default function ExpertMarketplace() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [campaignDialogOpen, setCampaignDialogOpen] = useState(false);

  const filteredExperts = mockExperts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSkill = !skillFilter || expert.skills.includes(skillFilter);
    const matchesAvailability = !availabilityFilter || expert.availability === availabilityFilter;
    return matchesSearch && matchesSkill && matchesAvailability;
  });

  const getConfidenceColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 75) return 'warning';
    return 'error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Planning': return 'warning';
      case 'Completed': return 'info';
      case 'Paused': return 'error';
      default: return 'default';
    }
  };

  const renderExpertCard = (expert) => (
    <Card 
      key={expert.id} 
      sx={{ 
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
      }}
      onClick={() => {
        setSelectedExpert(expert);
        setDialogOpen(true);
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={expert.verified ? <Verified sx={{ color: 'success.main', fontSize: 16 }} /> : null}
          >
            <Avatar 
              src={expert.avatar} 
              sx={{ width: 64, height: 64, mr: 2 }}
            >
              {expert.name.charAt(0)}
            </Avatar>
          </Badge>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h3">
              {expert.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {expert.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {expert.company}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Confidence Score
            </Typography>
            <Typography variant="body2" fontWeight="bold" color={`${getConfidenceColor(expert.confidenceScore)}.main`}>
              {expert.confidenceScore}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={expert.confidenceScore} 
            color={getConfidenceColor(expert.confidenceScore)}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={expert.rating} readOnly size="small" />
          <Typography variant="caption" sx={{ ml: 1 }}>
            ({expert.reviewCount} reviews)
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <AttachMoney sx={{ fontSize: 16, mr: 0.5 }} />
            ${expert.hourlyRate}/hr
          </Typography>
          <Chip 
            label={expert.availability} 
            size="small"
            color={expert.availability === 'Available' ? 'success' : 'warning'}
          />
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {expert.skills.slice(0, 3).map((skill, index) => (
            <Chip key={index} label={skill} size="small" variant="outlined" />
          ))}
          {expert.skills.length > 3 && (
            <Chip label={`+${expert.skills.length - 3} more`} size="small" />
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" color="text.secondary">
            <LocationOn sx={{ fontSize: 14, mr: 0.5 }} />
            {expert.location}
          </Typography>
        </Box>
      </CardContent>
      
      <CardActions>
        <Button size="small" startIcon={<Visibility />}>
          View Profile
        </Button>
        <Button size="small" variant="contained">
          Contact
        </Button>
      </CardActions>
    </Card>
  );

  const renderTalentPool = () => (
    <Box>
      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Find the Perfect Expert
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search experts, skills, or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Skill</InputLabel>
              <Select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                label="Skill"
              >
                <MenuItem value="">All Skills</MenuItem>
                <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                <MenuItem value="Supply Chain">Supply Chain</MenuItem>
                <MenuItem value="React">React</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Availability</InputLabel>
              <Select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                label="Availability"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Busy">Busy</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ height: 56 }}
            >
              Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Expert Grid */}
      <Grid container spacing={3}>
        {filteredExperts.map(renderExpertCard)}
      </Grid>
    </Box>
  );

  const renderCampaignCard = (campaign) => (
    <Card key={campaign.id} sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {campaign.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {campaign.tenant}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip 
              label={campaign.status} 
              color={getStatusColor(campaign.status)} 
              size="small" 
            />
            <Chip 
              label={campaign.priority} 
              color={campaign.priority === 'High' ? 'error' : 'warning'} 
              size="small" 
              variant="outlined"
            />
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>
          {campaign.description}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6} md={3}>
            <Typography variant="caption" color="text.secondary">
              Progress
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={campaign.progress} 
                sx={{ flex: 1 }}
              />
              <Typography variant="caption">
                {campaign.progress}%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="caption" color="text.secondary">
              Budget
            </Typography>
            <Typography variant="body2">
              ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="caption" color="text.secondary">
              Experts
            </Typography>
            <Typography variant="body2">
              {campaign.expertsAssigned} assigned
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="caption" color="text.secondary">
              Timeline
            </Typography>
            <Typography variant="body2">
              {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      
      <CardActions>
        <Button size="small" startIcon={<Visibility />}>
          View Details
        </Button>
        <Button size="small" startIcon={<Edit />}>
          Edit
        </Button>
        <Button size="small" startIcon={<Group />}>
          Manage Team
        </Button>
      </CardActions>
    </Card>
  );

  const renderCampaigns = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Campaign Management
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => setCampaignDialogOpen(true)}
        >
          Launch Campaign
        </Button>
      </Box>

      {mockCampaigns.map(renderCampaignCard)}
    </Box>
  );

  const renderAnalytics = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Analytics & Insights
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary">
                {mockExperts.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Experts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="success.main">
                {mockCampaigns.filter(c => c.status === 'Active').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Campaigns
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="secondary">
                94.2%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Success Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="warning.main">
                $245K
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Budget
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Campaign Performance
            </Typography>
            <Box sx={{ height: 300, bgcolor: 'background.default', borderRadius: 1, p: 2 }}>
              <Typography variant="body2" color="text.secondary" align="center">
                Campaign progress and performance charts will be displayed here
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Top Performing Experts
            </Typography>
            <List>
              {mockExperts.slice(0, 3).map((expert, index) => (
                <ListItem key={expert.id}>
                  <ListItemAvatar>
                    <Avatar src={expert.avatar}>
                      {expert.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={expert.name}
                    secondary={`${expert.confidenceScore}% confidence • ${expert.rating} rating`}
                  />
                  <Chip 
                    label={`#${index + 1}`} 
                    size="small" 
                    color="primary"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Expert Marketplace
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Connect with top talent, launch campaigns, and track progress across your organization
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>Platform Overview</AlertTitle>
        • {mockExperts.length} verified experts across multiple domains<br />
        • {mockCampaigns.length} active campaigns with budget tracking<br />
        • Advanced matching algorithms for optimal expert-project pairing<br />
        • Real-time progress monitoring and analytics
      </Alert>

      <Paper sx={{ mt: 4 }}>
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          centered
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Talent Pool" icon={<Person />} iconPosition="start" />
          <Tab label="Campaigns" icon={<Campaign />} iconPosition="start" />
          <Tab label="Analytics" icon={<Analytics />} iconPosition="start" />
        </Tabs>

        <Box sx={{ p: 4 }}>
          {activeTab === 0 && renderTalentPool()}
          {activeTab === 1 && renderCampaigns()}
          {activeTab === 2 && renderAnalytics()}
        </Box>
      </Paper>

      {/* Expert Profile Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedExpert && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src={selectedExpert.avatar} sx={{ width: 56, height: 56 }}>
                {selectedExpert.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6">{selectedExpert.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedExpert.title}
                </Typography>
              </Box>
              {selectedExpert.verified && <Verified color="success" />}
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          {selectedExpert && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Professional Summary
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Experience: {selectedExpert.experience}<br />
                    Education: {selectedExpert.education}<br />
                    Success Rate: {selectedExpert.successRate}%<br />
                    Completed Projects: {selectedExpert.completedProjects}
                  </Typography>
                  
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Skills & Expertise
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedExpert.skills.map((skill, index) => (
                      <Chip key={index} label={skill} size="small" />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Confidence Score
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={selectedExpert.confidenceScore} 
                      color={getConfidenceColor(selectedExpert.confidenceScore)}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                    <Typography variant="h4" color={`${getConfidenceColor(selectedExpert.confidenceScore)}.main`}>
                      {selectedExpert.confidenceScore}%
                    </Typography>
                  </Box>
                  
                  <Typography variant="subtitle1" gutterBottom>
                    Rating & Reviews
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Rating value={selectedExpert.rating} readOnly />
                    <Typography variant="body2">
                      {selectedExpert.rating} ({selectedExpert.reviewCount} reviews)
                    </Typography>
                  </Box>
                  
                  <Typography variant="subtitle1" gutterBottom>
                    Availability & Rate
                  </Typography>
                  <Typography variant="body2">
                    Status: <Chip 
                      label={selectedExpert.availability} 
                      size="small"
                      color={selectedExpert.availability === 'Available' ? 'success' : 'warning'}
                    /><br />
                    Rate: ${selectedExpert.hourlyRate}/hour<br />
                    Timezone: {selectedExpert.timezone}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          <Button variant="contained">Send Message</Button>
          <Button variant="contained" color="success">Hire Expert</Button>
        </DialogActions>
      </Dialog>

      {/* Launch Campaign Dialog */}
      <Dialog open={campaignDialogOpen} onClose={() => setCampaignDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Launch New Campaign</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Campaign Name"
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
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Budget"
            type="number"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select label="Category">
              <MenuItem value="AI/ML">AI/ML</MenuItem>
              <MenuItem value="Operations">Operations</MenuItem>
              <MenuItem value="Digital Transformation">Digital Transformation</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCampaignDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Launch Campaign</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 