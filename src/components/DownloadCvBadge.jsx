import "./DownloadCvBadge.css";

export default function DownloadCvBadge() {
  return (
    <a className="cv-badge" href="/My Resume.docx" download aria-label="Download my CV">
      <svg className="cv-ring" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path
            id="circlePath"
            d="M 100,100 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
          />
        </defs>

        <text className="cv-text">
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
            DOWNLOAD RESUME
          </textPath>
        </text>
      </svg>

      <span className="cv-center" aria-hidden="true">
        {/* simple download icon */}
        <svg viewBox="0 0 24 24" className="cv-icon">
          <path d="M12 3v10m0 0l4-4m-4 4L8 9M4 17v3h16v-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </a>
  );
}
