package com.green.lights.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Content.
 */
@Entity
@Table(name = "content")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "content")
public class Content implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 64)
    @Column(name = "title", length = 64, nullable = false)
    private String title;

    @Column(name = "source")
    private String source;

    @Column(name = "author")
    private String author;

    @Column(name = "cover")
    private String cover;

    @Transient
    private MultipartFile file;

    @Column(name = "content")
    private String content;

    @Column(name = "hot")
    private Integer hot = 0;

    @Column(name = "state")
    private Integer state = 0;

    @Column(name = "view_count")
    private Integer viewCount = 0;

    @Column(name = "create_time")
    private ZonedDateTime createTime;

    @ManyToOne
    private Category category;

    @OneToMany(mappedBy = "content")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Attachment> attachments = new HashSet<>();

    @Column(name = "url")
    private String url;

    @Column(name = "location")
    private String location;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Content title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSource() {
        return source;
    }

    public Content source(String source) {
        this.source = source;
        return this;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getAuthor() {
        return author;
    }

    public Content author(String author) {
        this.author = author;
        return this;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCover() {
        return cover;
    }

    public Content cover(String cover) {
        this.cover = cover;
        return this;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getContent() {
        return content;
    }

    public Content content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getHot() {
        return hot;
    }

    public Content hot(Integer hot) {
        this.hot = hot;
        return this;
    }

    public void setHot(Integer hot) {
        this.hot = hot;
    }

    public Integer getState() {
        return state;
    }

    public Content state(Integer state) {
        this.state = state;
        return this;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getViewCount() {
        return viewCount;
    }

    public Content viewCount(Integer viewCount) {
        this.viewCount = viewCount;
        return this;
    }

    public void setViewCount(Integer viewCount) {
        this.viewCount = viewCount;
    }

    public ZonedDateTime getCreateTime() {
        return createTime;
    }

    public Content createTime(ZonedDateTime createTime) {
        this.createTime = createTime;
        return this;
    }

    public void setCreateTime(ZonedDateTime createTime) {
        this.createTime = createTime;
    }

    public Category getCategory() {
        return category;
    }

    public Content category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<Attachment> getAttachments() {
        return attachments;
    }

    public Content attachments(Set<Attachment> attachments) {
        this.attachments = attachments;
        return this;
    }

    public Content addAttachment(Attachment attachment) {
        this.attachments.add(attachment);
        attachment.setContent(this);
        return this;
    }

    public Content removeAttachment(Attachment attachment) {
        this.attachments.remove(attachment);
        attachment.setContent(null);
        return this;
    }

    public void setAttachments(Set<Attachment> attachments) {
        this.attachments = attachments;
    }

    public String getUrl() {
        return url;
    }

    public Content url(String url) {
        this.url = url;
        return this;
    }
    public void setUrl(String url) {
        this.url = url;
    }

    public String getLocation() {
        return location;
    }

    public Content location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Content content = (Content) o;
        if (content.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), content.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Content{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", source='" + getSource() + "'" +
            ", author='" + getAuthor() + "'" +
            ", cover='" + getCover() + "'" +
            ", content='" + getContent() + "'" +
            ", hot='" + getHot() + "'" +
            ", state='" + getState() + "'" +
            ", viewCount='" + getViewCount() + "'" +
            ", createTime='" + getCreateTime() + "'" +
            "}";
    }
}
