import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faBuilding,
  faCloudArrowUp,
  faCrown,
  faEye,
  faHandshakeAngle,
  faHouseSignal,
  faLayerGroup,
  faPenToSquare,
  faPlus,
  faRightFromBracket,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { requestJson } from "../../Services/api";
import { clearAdminSession } from "../../Services/auth";
import * as S from "./AdminDashboard.styles";

const createBenefit = (id) => ({
  id,
  title: "",
  description: "",
  value: "",
  icon: "inspection",
});

const emptyProject = () => ({
  id: "",
  name: "",
  location: "",
  budget: "",
  budgetValue: "",
  status: "Under Construction",
  area: "",
  bhk: "",
  size: "",
  image: "",
  featured: false,
  amenitiesInput: "",
  builder: "",
  description: "",
  possession: "",
  priceRange: "",
  unitTypes: "",
  benefits: [createBenefit(1), createBenefit(2), createBenefit(3)],
  totalBenefitValue: "",
  benefitsWorth: "",
  locationAddress: "",
  googleMapsLink: "https://maps.google.com",
});

const mapProject = (project) => ({
  id: String(project.id),
  name: project.name || "",
  location: project.location || "",
  budget: project.budget || "",
  budgetValue: String(project.budgetValue || ""),
  status: project.status || "Under Construction",
  area: project.area || "",
  bhk: project.bhk || "",
  size: project.size || "",
  image: project.image || "",
  featured: Boolean(project.featured),
  amenitiesInput: Array.isArray(project.amenities) ? project.amenities.join(", ") : "",
  builder: project.builder || "",
  description: project.description || "",
  possession: project.possession || "",
  priceRange: project.priceRange || "",
  unitTypes: project.unitTypes || "",
  benefits:
    project.benefits?.length > 0
      ? project.benefits.map((benefit, index) => ({
          id: benefit.id || index + 1,
          title: benefit.title || "",
          description: benefit.description || "",
          value: benefit.value || "",
          icon: benefit.icon || "inspection",
        }))
      : [createBenefit(1)],
  totalBenefitValue: project.totalBenefitValue || "",
  benefitsWorth: project.benefitsWorth || "",
  locationAddress: project.locationAddress || "",
  googleMapsLink: project.googleMapsLink || "https://maps.google.com",
});

const buildProjectPayload = (form) => ({
  ...(form.id ? { id: Number(form.id) } : {}),
  name: form.name.trim(),
  location: form.location.trim(),
  budget: form.budget.trim(),
  budgetValue: Number(form.budgetValue),
  status: form.status,
  area: form.area.trim(),
  bhk: form.bhk.trim(),
  size: form.size.trim(),
  image: form.image.trim(),
  featured: Boolean(form.featured),
  amenities: form.amenitiesInput.split(",").map((item) => item.trim()).filter(Boolean),
  builder: form.builder.trim(),
  description: form.description.trim(),
  possession: form.possession.trim(),
  priceRange: form.priceRange.trim(),
  unitTypes: form.unitTypes.trim(),
  benefits: form.benefits
    .filter((benefit) => benefit.title.trim())
    .map((benefit, index) => ({
      id: Number(benefit.id) || index + 1,
      title: benefit.title.trim(),
      description: benefit.description.trim(),
      value: benefit.value.trim(),
      icon: benefit.icon.trim() || "inspection",
    })),
  totalBenefitValue: form.totalBenefitValue.trim(),
  benefitsWorth: form.benefitsWorth.trim(),
  locationAddress: form.locationAddress.trim(),
  googleMapsLink: form.googleMapsLink.trim(),
});

const formatDateTime = (value) =>
  value
    ? new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(value))
    : "Just now";

const toneForInvestor = (status) =>
  ({ qualified: "success", closed: "danger", contacted: "warning" }[status] || "info");
const toneForRequest = (status) =>
  ({ completed: "success", scheduled: "warning", closed: "danger" }[status] || "info");

const AdminDashboard = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("projects");
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [projectSearch, setProjectSearch] = useState("");
  const [projectForm, setProjectForm] = useState(emptyProject());
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [previewProject, setPreviewProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [message, setMessage] = useState(null);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [summaryResponse, projectsResponse, investorsResponse, requestsResponse] =
        await Promise.all([
          requestJson("/dashboard/summary"),
          requestJson("/projects"),
          requestJson("/investors"),
          requestJson("/requests"),
        ]);
      setStats(summaryResponse.data);
      setProjects(projectsResponse.data || []);
      setInvestors(investorsResponse.data || []);
      setRequests(requestsResponse.data || []);
      setMessage(null);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const filteredProjects = useMemo(() => {
    const query = projectSearch.trim().toLowerCase();
    if (!query) return projects;
    return projects.filter((project) =>
      [project.name, project.builder, project.location, project.status]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [projectSearch, projects]);

  const totals = stats?.totals || {};
  const recentItems = activeTab === "investors" ? stats?.recentInvestors || [] : stats?.recentRequests || [];

  const setProjectField = (field, value) =>
    setProjectForm((current) => ({ ...current, [field]: value }));
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setProjectField("image", typeof reader.result === "string" ? reader.result : "");
    };

    reader.readAsDataURL(file);
  };
  const updateBenefit = (index, field, value) =>
    setProjectForm((current) => ({
      ...current,
      benefits: current.benefits.map((benefit, benefitIndex) =>
        benefitIndex === index ? { ...benefit, [field]: value } : benefit
      ),
    }));
  const addBenefit = () =>
    setProjectForm((current) => ({
      ...current,
      benefits: [...current.benefits, createBenefit(current.benefits.length + 1)],
    }));
  const removeBenefit = (index) =>
    setProjectForm((current) => ({
      ...current,
      benefits:
        current.benefits.length === 1
          ? current.benefits
          : current.benefits.filter((_, benefitIndex) => benefitIndex !== index),
    }));
  const resetForm = () => {
    setProjectForm(emptyProject());
    setEditingProjectId(null);
  };
  const editProject = (project) => {
    setProjectForm(mapProject(project));
    setEditingProjectId(project.id);
    setActiveTab("projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitProject = async (event) => {
    event.preventDefault();
    setIsSavingProject(true);
    try {
      const payload = buildProjectPayload(projectForm);
      const url = editingProjectId ? `/projects/${editingProjectId}` : "/projects";
      const method = editingProjectId ? "PUT" : "POST";
      await requestJson(url, { method, body: JSON.stringify(payload) });
      setMessage({
        type: "success",
        text: editingProjectId ? "Project updated successfully." : "Project added successfully.",
      });
      resetForm();
      await loadDashboardData();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSavingProject(false);
    }
  };

  const deleteProject = async (projectId) => {
    if (!window.confirm("Delete this project from the admin catalog?")) return;
    try {
      await requestJson(`/projects/${projectId}`, { method: "DELETE" });
      if (editingProjectId === projectId) resetForm();
      setMessage({ type: "success", text: "Project deleted successfully." });
      await loadDashboardData();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const updateInvestorStatus = async (investorId, status) => {
    try {
      await requestJson(`/investors/${investorId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setInvestors((current) =>
        current.map((investor) =>
          investor._id === investorId ? { ...investor, status } : investor
        )
      );
      setMessage({ type: "success", text: "Investor status updated." });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const updateRequestStatus = async (requestId, status) => {
    try {
      await requestJson(`/requests/${requestId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setRequests((current) =>
        current.map((request) =>
          request._id === requestId ? { ...request, status } : request
        )
      );
      setMessage({ type: "success", text: "Request status updated." });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    history.replace("/login");
  };

  return (
    <S.PageShell>
      <S.BackgroundGlow />
      <S.AdminContainer>
        {message ? <S.Notification $tone={message.type}>{message.text}</S.Notification> : null}
        <S.HeroCard>
          <S.HeroContent>
            <S.Eyebrow>
              <FontAwesomeIcon icon={faCrown} /> Heritoria Admin Suite
            </S.Eyebrow>
            <S.HeroTitle>Luxury operations, finally handled in one place.</S.HeroTitle>
            <S.HeroText>
              Manage the full project inventory, monitor investor demand, and track
              every premium site-visit or benefit request from one polished command
              center.
            </S.HeroText>
            <S.HeroActions>
              <S.PrimaryButton type="button" onClick={resetForm}>
                <FontAwesomeIcon icon={faPlus} /> Add New Project
              </S.PrimaryButton>
              <S.SecondaryButton type="button" onClick={loadDashboardData}>
                <FontAwesomeIcon icon={faArrowRotateRight} /> Refresh Data
              </S.SecondaryButton>
              <S.SecondaryButton type="button" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </S.SecondaryButton>
            </S.HeroActions>
          </S.HeroContent>
          <S.HeroAside>
            <S.HeroVisual>
              <S.VisualGlow />
              <S.VisualGrid />
              <S.FloatBadge $top={22} $left={22}>
                <FontAwesomeIcon icon={faBuilding} />
                <S.FloatBadgeValue>Portfolio Atlas</S.FloatBadgeValue>
              </S.FloatBadge>
              <S.FloatBadge $top={28} $right={24}>
                <FontAwesomeIcon icon={faBuilding} />
                <S.FloatBadgeValue>{totals.featuredProjects || 0} featured projects</S.FloatBadgeValue>
              </S.FloatBadge>
              <S.FloatBadge $top={118} $right={92}>
                <FontAwesomeIcon icon={faHandshakeAngle} />
                <S.FloatBadgeValue>{totals.totalInvestors || 0} investor leads</S.FloatBadgeValue>
              </S.FloatBadge>
              <S.Skyline>
                {[
                  { width: 78, height: 126, tilt: -14 },
                  { width: 88, height: 172, tilt: -10 },
                  { width: 112, height: 214, tilt: -8 },
                  { width: 92, height: 182, tilt: -12 },
                  { width: 74, height: 136, tilt: -16 },
                ].map((building, buildingIndex) => (
                  <S.BuildingStack
                    key={`${building.width}-${building.height}-${buildingIndex}`}
                    $width={building.width}
                    $height={building.height}
                    $tilt={building.tilt}
                  >
                    <S.WindowGrid>
                      {Array.from({ length: 18 }).map((_, windowIndex) => (
                        <S.WindowCell
                          key={`${buildingIndex}-${windowIndex}`}
                          $lit={(windowIndex + buildingIndex) % 3 !== 0}
                        />
                      ))}
                    </S.WindowGrid>
                  </S.BuildingStack>
                ))}
              </S.Skyline>
            </S.HeroVisual>
            <S.ShowcaseCard>
              <S.ShowcaseLabel>Premium Catalog</S.ShowcaseLabel>
              <S.ShowcaseValue>{totals.totalProjects || 0} live projects</S.ShowcaseValue>
              <S.ShowcaseText>Live inventory connected to your CMS-ready backend.</S.ShowcaseText>
            </S.ShowcaseCard>
            <S.ShowcaseCard>
              <S.ShowcaseLabel>Investor Interest</S.ShowcaseLabel>
              <S.ShowcaseValue>{totals.totalInvestors || 0} investor leads</S.ShowcaseValue>
              <S.ShowcaseText>Track consultation demand and follow-up priority.</S.ShowcaseText>
            </S.ShowcaseCard>
            <S.ShowcaseCard>
              <S.ShowcaseLabel>Request Pipeline</S.ShowcaseLabel>
              <S.ShowcaseValue>{totals.totalRequests || 0} buyer requests</S.ShowcaseValue>
              <S.ShowcaseText>Benefit claims and visit bookings in one queue.</S.ShowcaseText>
            </S.ShowcaseCard>
            <S.ShowcaseCard>
              <S.ShowcaseLabel>Featured Inventory</S.ShowcaseLabel>
              <S.ShowcaseValue>{totals.featuredProjects || 0} highlighted</S.ShowcaseValue>
              <S.ShowcaseText>Control homepage visibility for signature listings.</S.ShowcaseText>
            </S.ShowcaseCard>
          </S.HeroAside>
        </S.HeroCard>

        <S.StatsGrid>
          <S.StatCard><S.StatValue>{totals.totalProjects || 0}</S.StatValue><S.StatLabel>Projects in portfolio</S.StatLabel></S.StatCard>
          <S.StatCard><S.StatValue>{totals.totalInvestors || 0}</S.StatValue><S.StatLabel>Investor leads captured</S.StatLabel></S.StatCard>
          <S.StatCard><S.StatValue>{totals.newRequests || 0}</S.StatValue><S.StatLabel>Fresh requests awaiting action</S.StatLabel></S.StatCard>
          <S.StatCard><S.StatValue>{totals.siteVisitRequests || 0}</S.StatValue><S.StatLabel>Site visits in the pipeline</S.StatLabel></S.StatCard>
        </S.StatsGrid>

        <S.TabsRow>
          {[
            { id: "projects", label: "Projects", icon: faBuilding, count: projects.length },
            { id: "investors", label: "Investors", icon: faHandshakeAngle, count: investors.length },
            { id: "requests", label: "Requests", icon: faHouseSignal, count: requests.length },
          ].map((tab) => (
            <S.TabButton key={tab.id} type="button" $active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>
              <FontAwesomeIcon icon={tab.icon} /> {tab.label} ({tab.count})
            </S.TabButton>
          ))}
        </S.TabsRow>

        <S.ContentGrid>
          <S.Panel>
            <S.PanelHeader>
              <div>
                <S.PanelTitle>{activeTab === "projects" ? "Project Inventory" : activeTab === "investors" ? "Investor Leads" : "Client Request Desk"}</S.PanelTitle>
                <S.PanelSubtitle>
                  {activeTab === "projects"
                    ? "Browse the exact project records flowing to the public website."
                    : activeTab === "investors"
                      ? "Track every investor consultation request and move them through the funnel."
                      : "Review benefit claims and site visit bookings coming from project pages."}
                </S.PanelSubtitle>
              </div>
              {activeTab === "projects" ? (
                <S.SearchInput
                  type="text"
                  placeholder="Search project, builder, location..."
                  value={projectSearch}
                  onChange={(event) => setProjectSearch(event.target.value)}
                />
              ) : (
                <S.SecondaryButton type="button" onClick={loadDashboardData}>
                  <FontAwesomeIcon icon={faLayerGroup} /> Sync View
                </S.SecondaryButton>
              )}
            </S.PanelHeader>

            {isLoading ? (
              <S.EmptyState>Loading your dashboard data...</S.EmptyState>
            ) : activeTab === "projects" ? (
              <S.TableWrap>
                <S.Table>
                  <S.THead>
                    <S.TRow><S.TH>Project</S.TH><S.TH>Status</S.TH><S.TH>Pricing</S.TH><S.TH>Benefits</S.TH><S.TH>Actions</S.TH></S.TRow>
                  </S.THead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <S.TRow key={project._id || project.id}>
                        <S.TD><S.ProjectName>{project.name}</S.ProjectName><S.ProjectMeta>{project.builder} • {project.location}</S.ProjectMeta></S.TD>
                        <S.TD><S.StatusBadge $tone={project.featured ? "featured" : "info"}>{project.status}</S.StatusBadge>{project.featured ? <S.ProjectMeta>Featured project</S.ProjectMeta> : null}</S.TD>
                        <S.TD><S.ProjectName>{project.priceRange}</S.ProjectName><S.ProjectMeta>{project.bhk} • {project.size}</S.ProjectMeta></S.TD>
                        <S.TD><S.ProjectName>{project.benefitsWorth}</S.ProjectName><S.ProjectMeta>{project.totalBenefitValue} value</S.ProjectMeta></S.TD>
                        <S.TD>
                          <S.ActionRow>
                            <S.TinyButton
                              type="button"
                              $variant="view"
                              onClick={() => setPreviewProject(project)}
                              aria-label="View project"
                              title="View project"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </S.TinyButton>
                            <S.TinyButton
                              type="button"
                              $variant="edit"
                              onClick={() => editProject(project)}
                              aria-label="Edit project"
                              title="Edit project"
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </S.TinyButton>
                            <S.TinyButton
                              type="button"
                              $variant="danger"
                              onClick={() => deleteProject(project.id)}
                              aria-label="Delete project"
                              title="Delete project"
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </S.TinyButton>
                          </S.ActionRow>
                        </S.TD>
                      </S.TRow>
                    ))}
                  </tbody>
                </S.Table>
              </S.TableWrap>
            ) : activeTab === "investors" ? (
              <S.TableWrap>
                <S.Table>
                  <S.THead>
                    <S.TRow><S.TH>Investor</S.TH><S.TH>Budget</S.TH><S.TH>Timeline</S.TH><S.TH>Status</S.TH><S.TH>Actions</S.TH></S.TRow>
                  </S.THead>
                  <tbody>
                    {investors.map((investor) => (
                      <S.TRow key={investor._id}>
                        <S.TD><S.ProjectName>{investor.fullName}</S.ProjectName><S.ProjectMeta>{investor.phone}{investor.email ? ` • ${investor.email}` : ""}</S.ProjectMeta></S.TD>
                        <S.TD>{investor.budget}</S.TD>
                        <S.TD>{investor.timeline || "Not specified"}</S.TD>
                        <S.TD><S.StatusBadge $tone={toneForInvestor(investor.status)}>{investor.status}</S.StatusBadge></S.TD>
                        <S.TD>
                          <S.ActionRow>
                            <S.TinyButton type="button" onClick={() => updateInvestorStatus(investor._id, "contacted")}>Contacted</S.TinyButton>
                            <S.TinyButton type="button" onClick={() => updateInvestorStatus(investor._id, "qualified")}>Qualified</S.TinyButton>
                            <S.TinyButton type="button" $variant="ghost" onClick={() => updateInvestorStatus(investor._id, "closed")}>Close</S.TinyButton>
                          </S.ActionRow>
                        </S.TD>
                      </S.TRow>
                    ))}
                  </tbody>
                </S.Table>
              </S.TableWrap>
            ) : (
              <S.TableWrap>
                <S.Table>
                  <S.THead>
                    <S.TRow><S.TH>Request</S.TH><S.TH>Project</S.TH><S.TH>Details</S.TH><S.TH>Status</S.TH><S.TH>Actions</S.TH></S.TRow>
                  </S.THead>
                  <tbody>
                    {requests.map((request) => (
                      <S.TRow key={request._id}>
                        <S.TD><S.ProjectName>{request.requestType === "siteVisit" ? "Site Visit" : "Benefit Claim"}</S.ProjectName><S.ProjectMeta>{request.fullName} • {request.phone}</S.ProjectMeta></S.TD>
                        <S.TD><S.ProjectName>{request.projectName}</S.ProjectName><S.ProjectMeta>{request.builder || "Builder not shared"}</S.ProjectMeta></S.TD>
                        <S.TD><S.ProjectName>{request.requestType === "siteVisit" ? `${request.visitDate || "Date pending"} • ${request.timeSlot || "Time pending"}` : request.planName || "Plan pending"}</S.ProjectName><S.ProjectMeta>{request.requestType === "siteVisit" ? `${request.guests || 0} visitors` : request.preferredUnit || "Unit preference not shared"}</S.ProjectMeta></S.TD>
                        <S.TD><S.StatusBadge $tone={toneForRequest(request.status)}>{request.status}</S.StatusBadge></S.TD>
                        <S.TD>
                          <S.ActionRow>
                            <S.TinyButton type="button" onClick={() => updateRequestStatus(request._id, "inProgress")}>In Progress</S.TinyButton>
                            <S.TinyButton type="button" onClick={() => updateRequestStatus(request._id, request.requestType === "siteVisit" ? "scheduled" : "completed")}>{request.requestType === "siteVisit" ? "Schedule" : "Complete"}</S.TinyButton>
                            <S.TinyButton type="button" $variant="ghost" onClick={() => updateRequestStatus(request._id, "closed")}>Close</S.TinyButton>
                          </S.ActionRow>
                        </S.TD>
                      </S.TRow>
                    ))}
                  </tbody>
                </S.Table>
              </S.TableWrap>
            )}
          </S.Panel>

          <S.Panel>
            <S.PanelHeader>
              <div>
                <S.PanelTitle>{activeTab === "projects" ? (editingProjectId ? "Edit Project" : "Add Project") : "Executive Snapshot"}</S.PanelTitle>
                <S.PanelSubtitle>
                  {activeTab === "projects"
                    ? "All fields from the project catalog are available here, including amenities and benefit blocks."
                    : "A compact, premium overview for quick operational decisions."}
                </S.PanelSubtitle>
              </div>
              {activeTab === "projects" && editingProjectId ? <S.TinyButton type="button" $variant="ghost" onClick={resetForm}>Reset Form</S.TinyButton> : null}
            </S.PanelHeader>

            <S.SidePanelBody>
              {activeTab === "projects" ? (
                <S.Form onSubmit={submitProject}>
                  <S.FieldGrid>
                    <S.Field><S.Label>Project ID</S.Label><S.Input type="number" value={projectForm.id} onChange={(event) => setProjectField("id", event.target.value)} placeholder="Auto-generated if empty" /></S.Field>
                    <S.Field><S.Label>Status</S.Label><S.Select value={projectForm.status} onChange={(event) => setProjectField("status", event.target.value)}><option value="Under Construction">Under Construction</option><option value="Ready to Move">Ready to Move</option><option value="Pre-Launch">Pre-Launch</option></S.Select></S.Field>
                  </S.FieldGrid>
                  <S.FieldGrid>
                    <S.Field><S.Label>Project Name</S.Label><S.Input value={projectForm.name} onChange={(event) => setProjectField("name", event.target.value)} required /></S.Field>
                    <S.Field><S.Label>Builder</S.Label><S.Input value={projectForm.builder} onChange={(event) => setProjectField("builder", event.target.value)} required /></S.Field>
                  </S.FieldGrid>
                  <S.FieldGrid>
                    <S.Field><S.Label>Location</S.Label><S.Input value={projectForm.location} onChange={(event) => setProjectField("location", event.target.value)} required /></S.Field>
                    <S.Field><S.Label>Area</S.Label><S.Input value={projectForm.area} onChange={(event) => setProjectField("area", event.target.value)} required /></S.Field>
                  </S.FieldGrid>
                  <S.FieldGrid>
                    <S.Field><S.Label>Budget Label</S.Label><S.Input value={projectForm.budget} onChange={(event) => setProjectField("budget", event.target.value)} placeholder="\u20b92.5 Cr" required /></S.Field>
                    <S.Field><S.Label>Budget Value</S.Label><S.Input type="number" value={projectForm.budgetValue} onChange={(event) => setProjectField("budgetValue", event.target.value)} placeholder="25000000" required /></S.Field>
                  </S.FieldGrid>
                  <S.FieldGrid>
                    <S.Field><S.Label>BHK</S.Label><S.Input value={projectForm.bhk} onChange={(event) => setProjectField("bhk", event.target.value)} placeholder="3, 4 BHK" required /></S.Field>
                    <S.Field><S.Label>Size</S.Label><S.Input value={projectForm.size} onChange={(event) => setProjectField("size", event.target.value)} placeholder="2000 - 3000 sq.ft" required /></S.Field>
                  </S.FieldGrid>
                  <S.Field>
                    <S.Label>Image URL</S.Label>
                    <S.Input value={projectForm.image} onChange={(event) => setProjectField("image", event.target.value)} placeholder="Paste image URL or upload below" required />
                  </S.Field>
                  <S.UploadCard>
                    <S.Label>Upload Project Image</S.Label>
                    <S.FileInput type="file" accept="image/*" onChange={handleImageUpload} />
                    <S.UploadHint>
                      <FontAwesomeIcon icon={faCloudArrowUp} /> Upload a project image from your device. It will be stored directly with the project for now.
                    </S.UploadHint>
                    {projectForm.image ? (
                      <S.UploadPreview>
                        <S.PreviewImage src={projectForm.image} alt={projectForm.name || "Project preview"} />
                      </S.UploadPreview>
                    ) : null}
                  </S.UploadCard>
                  <S.Field><S.Label>Description</S.Label><S.TextArea value={projectForm.description} onChange={(event) => setProjectField("description", event.target.value)} required /></S.Field>
                  <S.FieldGrid>
                    <S.Field><S.Label>Possession</S.Label><S.Input value={projectForm.possession} onChange={(event) => setProjectField("possession", event.target.value)} required /></S.Field>
                    <S.Field><S.Label>Unit Types</S.Label><S.Input value={projectForm.unitTypes} onChange={(event) => setProjectField("unitTypes", event.target.value)} required /></S.Field>
                  </S.FieldGrid>
                  <S.FieldGrid>
                    <S.Field><S.Label>Price Range</S.Label><S.Input value={projectForm.priceRange} onChange={(event) => setProjectField("priceRange", event.target.value)} required /></S.Field>
                    <S.Field><S.Label>Benefits Worth</S.Label><S.Input value={projectForm.benefitsWorth} onChange={(event) => setProjectField("benefitsWorth", event.target.value)} required /></S.Field>
                  </S.FieldGrid>
                  <S.Field><S.Label>Total Benefit Value</S.Label><S.Input value={projectForm.totalBenefitValue} onChange={(event) => setProjectField("totalBenefitValue", event.target.value)} required /></S.Field>
                  <S.Field><S.Label>Amenities</S.Label><S.TextArea value={projectForm.amenitiesInput} onChange={(event) => setProjectField("amenitiesInput", event.target.value)} placeholder="Separate each amenity with a comma" rows={3} required /></S.Field>
                  <S.Field><S.Label>Location Address</S.Label><S.Input value={projectForm.locationAddress} onChange={(event) => setProjectField("locationAddress", event.target.value)} required /></S.Field>
                  <S.Field><S.Label>Google Maps Link</S.Label><S.Input value={projectForm.googleMapsLink} onChange={(event) => setProjectField("googleMapsLink", event.target.value)} required /></S.Field>
                  <S.CheckboxRow><S.CheckboxInput type="checkbox" checked={projectForm.featured} onChange={(event) => setProjectField("featured", event.target.checked)} />Feature this project on the public experience</S.CheckboxRow>
                  <S.Divider />
                  <div>
                    <S.PanelTitle style={{ fontSize: "1rem", marginBottom: "14px" }}>Benefit Cards</S.PanelTitle>
                    <S.BenefitList>
                      {projectForm.benefits.map((benefit, index) => (
                        <S.BenefitCard key={`${benefit.id}-${index}`}>
                          <S.FieldGrid>
                            <S.Field><S.Label>Title</S.Label><S.Input value={benefit.title} onChange={(event) => updateBenefit(index, "title", event.target.value)} required /></S.Field>
                            <S.Field><S.Label>Value</S.Label><S.Input value={benefit.value} onChange={(event) => updateBenefit(index, "value", event.target.value)} placeholder="\u20b93L or Included" required /></S.Field>
                          </S.FieldGrid>
                          <S.FieldGrid>
                            <S.Field><S.Label>Icon</S.Label><S.Select value={benefit.icon} onChange={(event) => updateBenefit(index, "icon", event.target.value)}><option value="kitchen">Kitchen</option><option value="automation">Automation</option><option value="inspection">Inspection</option></S.Select></S.Field>
                            <S.Field><S.Label>Benefit ID</S.Label><S.Input type="number" value={benefit.id} onChange={(event) => updateBenefit(index, "id", event.target.value)} /></S.Field>
                          </S.FieldGrid>
                          <S.Field><S.Label>Description</S.Label><S.TextArea value={benefit.description} onChange={(event) => updateBenefit(index, "description", event.target.value)} rows={3} required /></S.Field>
                          <S.ActionRow><S.TinyButton type="button" $variant="ghost" onClick={() => removeBenefit(index)}>Remove Benefit</S.TinyButton></S.ActionRow>
                        </S.BenefitCard>
                      ))}
                    </S.BenefitList>
                  </div>
                  <S.ActionRow><S.TinyButton type="button" $variant="ghost" onClick={addBenefit}><FontAwesomeIcon icon={faPlus} /> Add Benefit</S.TinyButton></S.ActionRow>
                  <S.HeroActions>
                    <S.PrimaryButton type="submit" disabled={isSavingProject}>{editingProjectId ? "Update Project" : "Publish Project"}</S.PrimaryButton>
                    <S.SecondaryButton type="button" onClick={resetForm}>Clear Form</S.SecondaryButton>
                  </S.HeroActions>
                </S.Form>
              ) : (
                <>
                  <S.InsightList>
                    <S.InsightCard><S.InsightLabel>Featured Inventory</S.InsightLabel><S.InsightValue>{totals.featuredProjects || 0} featured projects are positioned to impress high-intent buyers.</S.InsightValue></S.InsightCard>
                    <S.InsightCard><S.InsightLabel>Warm Investor Leads</S.InsightLabel><S.InsightValue>{totals.openInvestorLeads || 0} investors still need a call-back or qualification update.</S.InsightValue></S.InsightCard>
                    <S.InsightCard><S.InsightLabel>Benefit Claims</S.InsightLabel><S.InsightValue>{totals.benefitRequests || 0} premium benefit requests are waiting in the funnel.</S.InsightValue></S.InsightCard>
                  </S.InsightList>
                  <div>
                    <S.PanelTitle style={{ fontSize: "1rem", marginBottom: "14px" }}>Recent Activity</S.PanelTitle>
                    <S.ActivityList>
                      {recentItems.map((item) => (
                        <S.ActivityItem key={item._id}>
                          <S.ActivityTitle>{activeTab === "investors" ? item.fullName : `${item.requestType === "siteVisit" ? "Site Visit" : "Benefit Claim"} • ${item.projectName}`}</S.ActivityTitle>
                          <S.ActivityMeta>{activeTab === "investors" ? `${item.budget} • ${item.phone}` : `${item.fullName} • ${item.phone}`}<br />{formatDateTime(item.createdAt)}</S.ActivityMeta>
                        </S.ActivityItem>
                      ))}
                    </S.ActivityList>
                  </div>
                </>
              )}
            </S.SidePanelBody>
          </S.Panel>
        </S.ContentGrid>
      </S.AdminContainer>
      {previewProject ? (
        <S.PreviewBackdrop onClick={() => setPreviewProject(null)}>
          <S.PreviewModal onClick={(event) => event.stopPropagation()}>
            <S.PreviewHeader>
              <div>
                <S.PreviewTitle>{previewProject.name}</S.PreviewTitle>
                <S.PreviewMeta>
                  {previewProject.builder} • {previewProject.location} • {previewProject.status}
                </S.PreviewMeta>
              </div>
              <S.CloseButton type="button" onClick={() => setPreviewProject(null)}>
                <FontAwesomeIcon icon={faXmark} />
              </S.CloseButton>
            </S.PreviewHeader>

            <S.PreviewBody>
              <div>
                <S.PreviewImageWrap>
                  <S.ModalPreviewImage
                    src={previewProject.image}
                    alt={previewProject.name}
                  />
                </S.PreviewImageWrap>

                <S.PreviewSection>
                  <S.PreviewSectionTitle>Project Overview</S.PreviewSectionTitle>
                  <S.PreviewText>{previewProject.description}</S.PreviewText>
                </S.PreviewSection>

                <S.PreviewSection>
                  <S.PreviewSectionTitle>Amenities</S.PreviewSectionTitle>
                  <S.PreviewChips>
                    {(previewProject.amenities || []).map((amenity) => (
                      <S.PreviewChip key={amenity}>{amenity}</S.PreviewChip>
                    ))}
                  </S.PreviewChips>
                </S.PreviewSection>

                <S.PreviewSection>
                  <S.PreviewSectionTitle>Benefits</S.PreviewSectionTitle>
                  <S.PreviewChips>
                    {(previewProject.benefits || []).map((benefit) => (
                      <S.PreviewChip key={`${benefit.id}-${benefit.title}`}>
                        {benefit.title}: {benefit.value}
                      </S.PreviewChip>
                    ))}
                  </S.PreviewChips>
                </S.PreviewSection>
              </div>

              <div>
                <S.PreviewSection>
                  <S.PreviewSectionTitle>Key Details</S.PreviewSectionTitle>
                  <S.PreviewStats>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Price Range</S.PreviewStatLabel>
                      <S.PreviewStatValue>{previewProject.priceRange}</S.PreviewStatValue>
                    </S.PreviewStat>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>BHK</S.PreviewStatLabel>
                      <S.PreviewStatValue>{previewProject.bhk}</S.PreviewStatValue>
                    </S.PreviewStat>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Size</S.PreviewStatLabel>
                      <S.PreviewStatValue>{previewProject.size}</S.PreviewStatValue>
                    </S.PreviewStat>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Possession</S.PreviewStatLabel>
                      <S.PreviewStatValue>{previewProject.possession}</S.PreviewStatValue>
                    </S.PreviewStat>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Unit Types</S.PreviewStatLabel>
                      <S.PreviewStatValue>{previewProject.unitTypes}</S.PreviewStatValue>
                    </S.PreviewStat>
                    <S.PreviewStat>
                      <S.PreviewStatLabel>Benefits Worth</S.PreviewStatLabel>
                      <S.PreviewStatValue>{previewProject.benefitsWorth}</S.PreviewStatValue>
                    </S.PreviewStat>
                  </S.PreviewStats>
                </S.PreviewSection>

                <S.PreviewSection>
                  <S.PreviewSectionTitle>Location</S.PreviewSectionTitle>
                  <S.PreviewText>{previewProject.locationAddress}</S.PreviewText>
                </S.PreviewSection>
              </div>
            </S.PreviewBody>
          </S.PreviewModal>
        </S.PreviewBackdrop>
      ) : null}
    </S.PageShell>
  );
};

export default AdminDashboard;
