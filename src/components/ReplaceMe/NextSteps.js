import React from 'react';

const NextSteps = props => {
  return (
    <div className="nextSteps">
      <h2>Next Steps...</h2>
      <p>
        See any red? Iron things out before proceeding.<br />
        Green or grey? You're ready to start building your app!
      </p>

      <p>
        <strong>Step 1: Remove the following in App.js</strong>:<br />
        <span className="code">
          <strong>05</strong>:&nbsp;
          import ReplaceMe from 'components/ReplaceMe/ReplaceMe';<br />

          <strong>17</strong>:&nbsp;
          &lt;Route path="/ready" element=&#123;&lt;ReplaceMe apiTestPath="/test" /&gt;&#125; /&gt;
        </span>
      </p>

      <p>
        <strong>Step 2: Update or Remove any Auth. Routes or Redirects</strong>:<br />
        <span className="code">
        <strong>20</strong>:&nbsp; &lt;Route element=&#123;&lt;AuthRoute auth=&#123;hasToken&#125; /&gt;&#125;&gt;<br />
        <strong>21</strong>:&nbsp; &nbsp;&nbsp;&lt;Route<br />
        <strong>22</strong>:&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;path="/authenticated-route"<br />
        <strong>23</strong>:&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;element=&#123;&lt;p&gt;Authenticated Content&lt;/p&gt;&#125;<br />
        <strong>24</strong>:&nbsp; &nbsp;&nbsp;/&gt;<br />
        <strong>25</strong>:&nbsp; &lt;/Route&gt;<br />
        <strong>26</strong>:&nbsp; <br />
        <strong>28</strong>:&nbsp; &lt;Route path="/" element=&#123;&lt;Navigate to="/ready" /&gt;&#125; /&gt;<br />
        </span>
      </p>

      <p />

      <strong>Step 3: Update the following in /public</strong>:<br />
      <ul>
        <li>
          <span className="code">index.html (title and other relevant changes).</span>
        </li>

        <li>
          <span className="code">logo192.png</span>
        </li>

        <li>
          <span className="code">logo512.png</span>
        </li>

        <li>
          <span className="code">favicon.ico</span>
        </li>

        <li>
          <span className="code">manifest.json (if needed)</span>
        </li>
      </ul>

      <p>
        <strong>Optional: Add apple-touch-icon.png in /public.</strong><br />
        <strong>Optional: Remove /components/ReplaceMe.</strong>
      </p>
      <p>
        See <a href="https://github.com/MikelMNJ/app-template" rel="noreferrer" target="_blank">Documentation</a> for details.
      </p>
    </div>
  );
};

export default NextSteps;